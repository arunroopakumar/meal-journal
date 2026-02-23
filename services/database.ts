import * as SQLite from 'expo-sqlite';
import { NutritionInfo, MealFoodItem } from '../models/FoodItem';
import { Meal, MealType, aggregateNutrition } from '../models/Meal';
import { UserProfile } from '../models/UserProfile';
import { generateId, getToday } from '../utils/dateUtils';

const DB_NAME = 'mealjournal.db';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!database) {
    database = await SQLite.openDatabaseAsync(DB_NAME);
    await initializeDatabase(database);
  }
  return database;
}

async function initializeDatabase(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`PRAGMA journal_mode = WAL`);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      height REAL NOT NULL,
      weight REAL NOT NULL,
      activity_level TEXT NOT NULL,
      dietary_preference TEXT NOT NULL DEFAULT 'vegetarian',
      goal TEXT NOT NULL DEFAULT 'maintain',
      calorie_target INTEGER NOT NULL,
      protein_target REAL NOT NULL,
      carbs_target REAL NOT NULL,
      fat_target REAL NOT NULL,
      fiber_target REAL NOT NULL DEFAULT 30,
      onboarding_complete INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS meals (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      meal_type TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user_profile(id)
    )
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS meal_items (
      id TEXT PRIMARY KEY,
      meal_id TEXT NOT NULL,
      food_id TEXT NOT NULL,
      food_name TEXT NOT NULL,
      servings REAL NOT NULL,
      serving_size REAL NOT NULL,
      serving_unit TEXT NOT NULL,
      calories INTEGER NOT NULL,
      protein REAL NOT NULL,
      carbs REAL NOT NULL,
      fat REAL NOT NULL,
      fiber REAL NOT NULL,
      iron REAL NOT NULL DEFAULT 0,
      calcium REAL NOT NULL DEFAULT 0,
      vitamin_c REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
    )
  `);

  await db.execAsync(`CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(date)`);
  await db.execAsync(`CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals(user_id, date)`);
  await db.execAsync(`CREATE INDEX IF NOT EXISTS idx_meal_items_meal ON meal_items(meal_id)`);
}

// ─── User Profile Operations ───────────────────────────────────────────

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO user_profile
      (id, name, age, gender, height, weight, activity_level, dietary_preference, goal,
       calorie_target, protein_target, carbs_target, fat_target, fiber_target,
       onboarding_complete, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      profile.id,
      profile.name,
      profile.age,
      profile.gender,
      profile.height,
      profile.weight,
      profile.activityLevel,
      profile.dietaryPreference,
      profile.goal,
      profile.calorieTarget,
      profile.proteinTarget,
      profile.carbsTarget,
      profile.fatTarget,
      profile.fiberTarget,
      profile.onboardingComplete ? 1 : 0,
      profile.createdAt,
      profile.updatedAt,
    ]
  );
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<Record<string, unknown>>(
    'SELECT * FROM user_profile LIMIT 1'
  );
  if (!row) return null;
  return mapRowToProfile(row);
}

function mapRowToProfile(row: Record<string, unknown>): UserProfile {
  return {
    id: row.id as string,
    name: row.name as string,
    age: row.age as number,
    gender: row.gender as 'male' | 'female',
    height: row.height as number,
    weight: row.weight as number,
    activityLevel: row.activity_level as UserProfile['activityLevel'],
    dietaryPreference: row.dietary_preference as UserProfile['dietaryPreference'],
    goal: row.goal as UserProfile['goal'],
    calorieTarget: row.calorie_target as number,
    proteinTarget: row.protein_target as number,
    carbsTarget: row.carbs_target as number,
    fatTarget: row.fat_target as number,
    fiberTarget: row.fiber_target as number,
    onboardingComplete: (row.onboarding_complete as number) === 1,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// ─── Meal Operations ────────────────────────────────────────────────────

export async function saveMeal(meal: Meal): Promise<void> {
  const db = await getDatabase();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT OR REPLACE INTO meals (id, user_id, date, meal_type, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [meal.id, meal.userId, meal.date, meal.mealType, meal.createdAt || now, now]
  );

  // Delete existing items for this meal (to handle updates)
  await db.runAsync('DELETE FROM meal_items WHERE meal_id = ?', [meal.id]);

  // Insert all items
  for (const item of meal.items) {
    await db.runAsync(
      `INSERT INTO meal_items
        (id, meal_id, food_id, food_name, servings, serving_size, serving_unit,
         calories, protein, carbs, fat, fiber, iron, calcium, vitamin_c)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.id,
        meal.id,
        item.foodItem.id,
        item.foodItem.name,
        item.servings,
        item.foodItem.servingSize,
        item.foodItem.servingUnit,
        item.totalNutrition.calories,
        item.totalNutrition.protein,
        item.totalNutrition.carbs,
        item.totalNutrition.fat,
        item.totalNutrition.fiber,
        item.totalNutrition.iron,
        item.totalNutrition.calcium,
        item.totalNutrition.vitaminC,
      ]
    );
  }
}

export async function getMealsForDate(userId: string, date: string): Promise<Meal[]> {
  const db = await getDatabase();

  const mealRows = await db.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM meals WHERE user_id = ? AND date = ? ORDER BY meal_type',
    [userId, date]
  );

  const meals: Meal[] = [];
  for (const mealRow of mealRows) {
    const itemRows = await db.getAllAsync<Record<string, unknown>>(
      'SELECT * FROM meal_items WHERE meal_id = ?',
      [mealRow.id as string]
    );

    const items: MealFoodItem[] = itemRows.map((itemRow) => ({
      id: itemRow.id as string,
      foodItem: {
        id: itemRow.food_id as string,
        name: itemRow.food_name as string,
        category: 'other' as const,
        servingSize: itemRow.serving_size as number,
        servingUnit: itemRow.serving_unit as string,
        nutritionPer100g: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, iron: 0, calcium: 0, vitaminC: 0 },
        isVegetarian: true,
        isVegan: false,
        tags: [],
      },
      servings: itemRow.servings as number,
      totalNutrition: {
        calories: itemRow.calories as number,
        protein: itemRow.protein as number,
        carbs: itemRow.carbs as number,
        fat: itemRow.fat as number,
        fiber: itemRow.fiber as number,
        iron: itemRow.iron as number,
        calcium: itemRow.calcium as number,
        vitaminC: itemRow.vitamin_c as number,
      },
    }));

    meals.push({
      id: mealRow.id as string,
      userId: mealRow.user_id as string,
      date: mealRow.date as string,
      mealType: mealRow.meal_type as MealType,
      items,
      totalNutrition: aggregateNutrition(items),
      createdAt: mealRow.created_at as string,
      updatedAt: mealRow.updated_at as string,
    });
  }

  return meals;
}

export async function deleteMeal(mealId: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM meal_items WHERE meal_id = ?', [mealId]);
  await db.runAsync('DELETE FROM meals WHERE id = ?', [mealId]);
}

export async function getDailyNutrition(
  userId: string,
  date: string
): Promise<NutritionInfo> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<Record<string, unknown>>(
    `SELECT
      COALESCE(SUM(mi.calories), 0) as calories,
      COALESCE(SUM(mi.protein), 0) as protein,
      COALESCE(SUM(mi.carbs), 0) as carbs,
      COALESCE(SUM(mi.fat), 0) as fat,
      COALESCE(SUM(mi.fiber), 0) as fiber,
      COALESCE(SUM(mi.iron), 0) as iron,
      COALESCE(SUM(mi.calcium), 0) as calcium,
      COALESCE(SUM(mi.vitamin_c), 0) as vitamin_c
    FROM meals m
    JOIN meal_items mi ON mi.meal_id = m.id
    WHERE m.user_id = ? AND m.date = ?`,
    [userId, date]
  );

  if (!row) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, iron: 0, calcium: 0, vitaminC: 0 };
  }

  return {
    calories: Math.round(row.calories as number),
    protein: Math.round((row.protein as number) * 10) / 10,
    carbs: Math.round((row.carbs as number) * 10) / 10,
    fat: Math.round((row.fat as number) * 10) / 10,
    fiber: Math.round((row.fiber as number) * 10) / 10,
    iron: Math.round((row.iron as number) * 10) / 10,
    calcium: Math.round(row.calcium as number),
    vitaminC: Math.round((row.vitamin_c as number) * 10) / 10,
  };
}

/**
 * Get nutrition data for multiple dates (for history/trends)
 */
export async function getNutritionHistory(
  userId: string,
  startDate: string,
  endDate: string
): Promise<Map<string, NutritionInfo>> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT
      m.date,
      COALESCE(SUM(mi.calories), 0) as calories,
      COALESCE(SUM(mi.protein), 0) as protein,
      COALESCE(SUM(mi.carbs), 0) as carbs,
      COALESCE(SUM(mi.fat), 0) as fat,
      COALESCE(SUM(mi.fiber), 0) as fiber,
      COALESCE(SUM(mi.iron), 0) as iron,
      COALESCE(SUM(mi.calcium), 0) as calcium,
      COALESCE(SUM(mi.vitamin_c), 0) as vitamin_c
    FROM meals m
    JOIN meal_items mi ON mi.meal_id = m.id
    WHERE m.user_id = ? AND m.date >= ? AND m.date <= ?
    GROUP BY m.date
    ORDER BY m.date`,
    [userId, startDate, endDate]
  );

  const history = new Map<string, NutritionInfo>();
  for (const row of rows) {
    history.set(row.date as string, {
      calories: Math.round(row.calories as number),
      protein: Math.round((row.protein as number) * 10) / 10,
      carbs: Math.round((row.carbs as number) * 10) / 10,
      fat: Math.round((row.fat as number) * 10) / 10,
      fiber: Math.round((row.fiber as number) * 10) / 10,
      iron: Math.round((row.iron as number) * 10) / 10,
      calcium: Math.round(row.calcium as number),
      vitaminC: Math.round((row.vitamin_c as number) * 10) / 10,
    });
  }

  return history;
}

/**
 * Get recent food items used by the user (for quick re-logging)
 */
export async function getRecentFoods(userId: string, limit: number = 20): Promise<string[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT DISTINCT mi.food_name
     FROM meal_items mi
     JOIN meals m ON m.id = mi.meal_id
     WHERE m.user_id = ?
     ORDER BY m.created_at DESC
     LIMIT ?`,
    [userId, limit]
  );
  return rows.map((r) => r.food_name as string);
}
