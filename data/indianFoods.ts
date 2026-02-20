import { FoodItem, FoodCategory } from '../models/FoodItem';
import { DietaryPreference } from '../models/UserProfile';

export const INDIAN_FOODS: FoodItem[] = [
  // ===== SOUTH INDIAN =====
  {
    id: 'si-001', name: 'Idli', hindiName: 'इडली', category: 'south-indian', region: 'south',
    servingSize: 40, servingUnit: 'piece',
    nutritionPer100g: { calories: 130, protein: 3.9, carbs: 24.8, fat: 1.2, fiber: 1.0, iron: 0.8, calcium: 12, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian', 'steamed', 'light'],
  },
  {
    id: 'si-002', name: 'Masala Dosa', hindiName: 'मसाला डोसा', category: 'south-indian', region: 'south',
    servingSize: 150, servingUnit: 'piece',
    nutritionPer100g: { calories: 165, protein: 3.5, carbs: 22.0, fat: 7.0, fiber: 1.2, iron: 1.0, calcium: 15, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian', 'main-course'],
  },
  {
    id: 'si-003', name: 'Plain Dosa', hindiName: 'सादा डोसा', category: 'south-indian', region: 'south',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 150, protein: 3.2, carbs: 24.0, fat: 4.5, fiber: 0.8, iron: 0.9, calcium: 10, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian'],
  },
  {
    id: 'si-004', name: 'Upma', hindiName: 'उपमा', category: 'south-indian', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 3.5, carbs: 18.0, fat: 5.0, fiber: 1.5, iron: 1.0, calcium: 15, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian'],
  },
  {
    id: 'si-005', name: 'Sambar', hindiName: 'सांभर', category: 'south-indian', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 65, protein: 3.5, carbs: 9.0, fat: 1.5, fiber: 2.0, iron: 1.2, calcium: 30, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'south-indian', 'side-dish', 'high-fiber'],
  },
  {
    id: 'si-006', name: 'Coconut Chutney', hindiName: 'नारियल चटनी', category: 'south-indian', region: 'south',
    servingSize: 30, servingUnit: 'tablespoon',
    nutritionPer100g: { calories: 185, protein: 2.5, carbs: 8.0, fat: 16.0, fiber: 3.0, iron: 0.5, calcium: 10, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'accompaniment', 'south-indian'],
  },
  {
    id: 'si-007', name: 'Medu Vada', hindiName: 'मेदु वड़ा', category: 'south-indian', region: 'south',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 250, protein: 10.0, carbs: 25.0, fat: 12.0, fiber: 3.0, iron: 2.0, calcium: 30, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'snack', 'south-indian', 'high-protein'],
  },
  {
    id: 'si-008', name: 'Uttapam', hindiName: 'उत्तपम', category: 'south-indian', region: 'south',
    servingSize: 150, servingUnit: 'piece',
    nutritionPer100g: { calories: 145, protein: 4.0, carbs: 22.0, fat: 4.5, fiber: 1.5, iron: 1.0, calcium: 20, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian'],
  },
  {
    id: 'si-009', name: 'Appam', hindiName: 'अप्पम', category: 'south-indian', region: 'south',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 160, protein: 2.5, carbs: 28.0, fat: 4.0, fiber: 0.5, iron: 0.6, calcium: 8, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian', 'kerala'],
  },
  {
    id: 'si-010', name: 'Pongal', hindiName: 'पोंगल', category: 'south-indian', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 140, protein: 4.0, carbs: 20.0, fat: 5.0, fiber: 1.0, iron: 0.8, calcium: 15, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['breakfast', 'south-indian'],
  },
  {
    id: 'si-011', name: 'Rasam', hindiName: 'रसम', category: 'south-indian', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 30, protein: 1.0, carbs: 5.0, fat: 0.5, fiber: 0.5, iron: 0.5, calcium: 10, vitaminC: 12 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'south-indian', 'side-dish', 'low-calorie'],
  },
  {
    id: 'si-012', name: 'Pesarattu', hindiName: 'पेसरट्टू', category: 'south-indian', region: 'south',
    servingSize: 120, servingUnit: 'piece',
    nutritionPer100g: { calories: 120, protein: 7.5, carbs: 16.0, fat: 3.0, fiber: 3.0, iron: 1.5, calcium: 25, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian', 'high-protein', 'high-fiber'],
  },
  // ===== DAL & LEGUMES =====
  {
    id: 'dl-001', name: 'Dal Tadka (Toor Dal)', hindiName: 'दाल तड़का', category: 'dal-legumes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 105, protein: 6.5, carbs: 13.0, fat: 3.0, fiber: 3.0, iron: 1.8, calcium: 25, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'high-fiber'],
  },
  {
    id: 'dl-002', name: 'Chana Dal', hindiName: 'चना दाल', category: 'dal-legumes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 115, protein: 7.0, carbs: 14.0, fat: 3.5, fiber: 4.0, iron: 2.0, calcium: 30, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'high-fiber'],
  },
  {
    id: 'dl-003', name: 'Moong Dal', hindiName: 'मूंग दाल', category: 'dal-legumes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 95, protein: 7.0, carbs: 12.0, fat: 2.0, fiber: 2.5, iron: 1.5, calcium: 20, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'light'],
  },
  {
    id: 'dl-004', name: 'Rajma (Kidney Beans Curry)', hindiName: 'राजमा', category: 'dal-legumes', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 120, protein: 7.0, carbs: 15.0, fat: 3.5, fiber: 5.0, iron: 2.5, calcium: 35, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'high-fiber', 'curry'],
  },
  {
    id: 'dl-005', name: 'Chole (Chickpea Curry)', hindiName: 'छोले', category: 'dal-legumes', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 140, protein: 7.5, carbs: 16.0, fat: 5.0, fiber: 5.0, iron: 2.5, calcium: 40, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'high-fiber', 'curry'],
  },
  {
    id: 'dl-006', name: 'Dal Makhani', hindiName: 'दाल मखनी', category: 'dal-legumes', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 145, protein: 6.0, carbs: 12.0, fat: 8.0, fiber: 3.5, iron: 2.0, calcium: 35, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'rich', 'curry'],
  },
  {
    id: 'dl-007', name: 'Masoor Dal', hindiName: 'मसूर दाल', category: 'dal-legumes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 100, protein: 7.5, carbs: 13.0, fat: 2.0, fiber: 3.0, iron: 2.0, calcium: 20, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'high-fiber'],
  },
  {
    id: 'dl-008', name: 'Sambhar (with vegetables)', hindiName: 'सांभर', category: 'dal-legumes', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 70, protein: 3.5, carbs: 10.0, fat: 1.5, fiber: 2.5, iron: 1.2, calcium: 28, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'high-fiber'],
  },
  {
    id: 'dl-009', name: 'Urad Dal', hindiName: 'उड़द दाल', category: 'dal-legumes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 110, protein: 7.5, carbs: 13.0, fat: 3.0, fiber: 3.5, iron: 2.2, calcium: 35, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein'],
  },
  {
    id: 'dl-010', name: 'Kadhi Pakora', hindiName: 'कढ़ी पकोड़ा', category: 'dal-legumes', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 120, protein: 4.0, carbs: 10.0, fat: 7.0, fiber: 1.0, iron: 0.8, calcium: 60, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry'],
  },
  // ===== BREAD & ROTI =====
  {
    id: 'br-001', name: 'Roti (Chapati)', hindiName: 'रोटी', category: 'bread-roti', region: 'pan-indian',
    servingSize: 35, servingUnit: 'piece',
    nutritionPer100g: { calories: 260, protein: 8.5, carbs: 50.0, fat: 3.5, fiber: 3.0, iron: 2.5, calcium: 25, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment', 'staple'],
  },
  {
    id: 'br-002', name: 'Naan', hindiName: 'नान', category: 'bread-roti', region: 'north',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 290, protein: 8.0, carbs: 48.0, fat: 7.5, fiber: 2.0, iron: 2.0, calcium: 50, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment'],
  },
  {
    id: 'br-003', name: 'Paratha (Plain)', hindiName: 'पराठा', category: 'bread-roti', region: 'north',
    servingSize: 60, servingUnit: 'piece',
    nutritionPer100g: { calories: 300, protein: 7.5, carbs: 42.0, fat: 12.0, fiber: 2.5, iron: 2.0, calcium: 20, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'lunch', 'dinner', 'side-dish'],
  },
  {
    id: 'br-004', name: 'Aloo Paratha', hindiName: 'आलू पराठा', category: 'bread-roti', region: 'north',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 270, protein: 5.5, carbs: 38.0, fat: 11.0, fiber: 2.0, iron: 1.5, calcium: 20, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'main-course'],
  },
  {
    id: 'br-005', name: 'Puri', hindiName: 'पूरी', category: 'bread-roti', region: 'pan-indian',
    servingSize: 25, servingUnit: 'piece',
    nutritionPer100g: { calories: 350, protein: 7.0, carbs: 42.0, fat: 17.0, fiber: 2.0, iron: 2.0, calcium: 20, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'lunch', 'side-dish'],
  },
  {
    id: 'br-006', name: 'Bhatura', hindiName: 'भटूरा', category: 'bread-roti', region: 'north',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 320, protein: 7.0, carbs: 40.0, fat: 15.0, fiber: 1.5, iron: 1.8, calcium: 25, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'side-dish'],
  },
  {
    id: 'br-007', name: 'Rumali Roti', hindiName: 'रूमाली रोटी', category: 'bread-roti', region: 'north',
    servingSize: 40, servingUnit: 'piece',
    nutritionPer100g: { calories: 240, protein: 7.5, carbs: 46.0, fat: 3.0, fiber: 2.0, iron: 2.0, calcium: 20, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment'],
  },
  {
    id: 'br-008', name: 'Missi Roti', hindiName: 'मिस्सी रोटी', category: 'bread-roti', region: 'north',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 270, protein: 10.0, carbs: 40.0, fat: 7.0, fiber: 4.0, iron: 2.5, calcium: 30, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'high-protein', 'high-fiber'],
  },
  {
    id: 'br-009', name: 'Kulcha', hindiName: 'कुल्चा', category: 'bread-roti', region: 'north',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 295, protein: 8.0, carbs: 46.0, fat: 8.5, fiber: 2.0, iron: 2.0, calcium: 40, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment'],
  },
  {
    id: 'br-010', name: 'Thepla', hindiName: 'थेपला', category: 'bread-roti', region: 'west',
    servingSize: 40, servingUnit: 'piece',
    nutritionPer100g: { calories: 280, protein: 8.5, carbs: 38.0, fat: 10.0, fiber: 3.5, iron: 2.5, calcium: 40, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'snack', 'gujarati', 'high-fiber'],
  },
  // ===== RICE DISHES =====
  {
    id: 'rd-001', name: 'Steamed Basmati Rice', hindiName: 'बासमती चावल', category: 'rice-dishes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 2.7, carbs: 28.0, fat: 0.3, fiber: 0.4, iron: 0.5, calcium: 10, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment', 'staple'],
  },
  {
    id: 'rd-002', name: 'Vegetable Biryani', hindiName: 'वेज बिरयानी', category: 'rice-dishes', region: 'pan-indian',
    servingSize: 250, servingUnit: 'plate',
    nutritionPer100g: { calories: 150, protein: 3.5, carbs: 22.0, fat: 5.5, fiber: 1.5, iron: 1.0, calcium: 20, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'rice-dish'],
  },
  {
    id: 'rd-003', name: 'Chicken Biryani', hindiName: 'चिकन बिरयानी', category: 'rice-dishes', region: 'pan-indian',
    servingSize: 300, servingUnit: 'plate',
    nutritionPer100g: { calories: 175, protein: 9.0, carbs: 20.0, fat: 6.5, fiber: 0.8, iron: 1.2, calcium: 18, vitaminC: 2 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'rice-dish', 'high-protein'],
  },
  {
    id: 'rd-004', name: 'Mutton Biryani', hindiName: 'मटन बिरयानी', category: 'rice-dishes', region: 'pan-indian',
    servingSize: 300, servingUnit: 'plate',
    nutritionPer100g: { calories: 190, protein: 10.0, carbs: 18.0, fat: 8.5, fiber: 0.6, iron: 1.5, calcium: 20, vitaminC: 1 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'rice-dish', 'high-protein'],
  },
  {
    id: 'rd-005', name: 'Jeera Rice', hindiName: 'जीरा राइस', category: 'rice-dishes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 145, protein: 2.8, carbs: 26.0, fat: 3.0, fiber: 0.5, iron: 0.6, calcium: 12, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment'],
  },
  {
    id: 'rd-006', name: 'Lemon Rice', hindiName: 'नींबू चावल', category: 'rice-dishes', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 155, protein: 2.5, carbs: 27.0, fat: 4.0, fiber: 0.6, iron: 0.5, calcium: 10, vitaminC: 6 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'main-course', 'rice-dish', 'south-indian'],
  },
  {
    id: 'rd-007', name: 'Curd Rice', hindiName: 'दही चावल', category: 'rice-dishes', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 125, protein: 3.5, carbs: 22.0, fat: 2.5, fiber: 0.3, iron: 0.4, calcium: 50, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'rice-dish', 'light'],
  },
  {
    id: 'rd-008', name: 'Pulao (Veg)', hindiName: 'वेज पुलाव', category: 'rice-dishes', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 150, protein: 3.0, carbs: 24.0, fat: 4.5, fiber: 1.0, iron: 0.8, calcium: 15, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'rice-dish'],
  },
  {
    id: 'rd-009', name: 'Khichdi', hindiName: 'खिचड़ी', category: 'rice-dishes', region: 'pan-indian',
    servingSize: 250, servingUnit: 'bowl',
    nutritionPer100g: { calories: 120, protein: 5.0, carbs: 18.0, fat: 3.0, fiber: 2.0, iron: 1.0, calcium: 15, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'light', 'comfort-food'],
  },
  {
    id: 'rd-010', name: 'Tamarind Rice', hindiName: 'इमली चावल', category: 'rice-dishes', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 160, protein: 2.5, carbs: 28.0, fat: 4.5, fiber: 0.8, iron: 0.6, calcium: 12, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'main-course', 'rice-dish', 'south-indian'],
  },
  // ===== CURRIES =====
  {
    id: 'cu-001', name: 'Paneer Butter Masala', hindiName: 'पनीर बटर मसाला', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 200, protein: 9.0, carbs: 8.0, fat: 15.0, fiber: 1.0, iron: 1.0, calcium: 150, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'rich'],
  },
  {
    id: 'cu-002', name: 'Butter Chicken', hindiName: 'बटर चिकन', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 175, protein: 14.0, carbs: 6.0, fat: 11.0, fiber: 0.8, iron: 1.5, calcium: 40, vitaminC: 4 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein', 'rich'],
  },
  {
    id: 'cu-003', name: 'Chicken Tikka Masala', hindiName: 'चिकन टिक्का मसाला', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 165, protein: 15.0, carbs: 7.0, fat: 9.0, fiber: 1.0, iron: 1.5, calcium: 35, vitaminC: 5 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  {
    id: 'cu-004', name: 'Palak Paneer', hindiName: 'पालक पनीर', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 145, protein: 8.5, carbs: 5.0, fat: 10.5, fiber: 2.0, iron: 3.0, calcium: 200, vitaminC: 15 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-fiber'],
  },
  {
    id: 'cu-005', name: 'Aloo Gobi', hindiName: 'आलू गोभी', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 100, protein: 2.5, carbs: 12.0, fat: 5.0, fiber: 2.5, iron: 0.8, calcium: 25, vitaminC: 20 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry', 'low-calorie'],
  },
  {
    id: 'cu-006', name: 'Bhindi Masala (Okra)', hindiName: 'भिंडी मसाला', category: 'curries', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 90, protein: 2.5, carbs: 8.0, fat: 5.5, fiber: 3.0, iron: 1.0, calcium: 70, vitaminC: 12 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry', 'low-calorie', 'high-fiber'],
  },
  {
    id: 'cu-007', name: 'Mutton Rogan Josh', hindiName: 'मटन रोगन जोश', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 155, protein: 15.0, carbs: 4.0, fat: 9.0, fiber: 0.5, iron: 2.5, calcium: 20, vitaminC: 2 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  {
    id: 'cu-008', name: 'Fish Curry', hindiName: 'मछली करी', category: 'curries', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 14.0, carbs: 4.0, fat: 6.5, fiber: 0.5, iron: 1.0, calcium: 30, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  {
    id: 'cu-009', name: 'Egg Curry', hindiName: 'अंडा करी', category: 'curries', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 135, protein: 9.0, carbs: 5.0, fat: 9.0, fiber: 0.8, iron: 1.5, calcium: 45, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  {
    id: 'cu-010', name: 'Malai Kofta', hindiName: 'मलाई कोफ्ता', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 210, protein: 6.0, carbs: 12.0, fat: 15.0, fiber: 1.5, iron: 1.0, calcium: 80, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'rich'],
  },
  {
    id: 'cu-011', name: 'Baingan Bharta', hindiName: 'बैंगन भर्ता', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 85, protein: 2.0, carbs: 8.0, fat: 5.0, fiber: 3.0, iron: 0.8, calcium: 20, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry', 'low-calorie'],
  },
  {
    id: 'cu-012', name: 'Aloo Matar', hindiName: 'आलू मटर', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 110, protein: 3.5, carbs: 14.0, fat: 4.5, fiber: 2.5, iron: 1.0, calcium: 20, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry'],
  },
  {
    id: 'cu-013', name: 'Paneer Tikka', hindiName: 'पनीर टिक्का', category: 'curries', region: 'north',
    servingSize: 150, servingUnit: 'plate',
    nutritionPer100g: { calories: 220, protein: 14.0, carbs: 5.0, fat: 16.0, fiber: 1.0, iron: 1.0, calcium: 200, vitaminC: 5 },
    isVegetarian: true, isVegan: false, tags: ['snack', 'dinner', 'high-protein', 'tandoori'],
  },
  {
    id: 'cu-014', name: 'Shahi Paneer', hindiName: 'शाही पनीर', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 195, protein: 9.0, carbs: 7.0, fat: 14.5, fiber: 0.8, iron: 1.0, calcium: 160, vitaminC: 2 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'rich'],
  },
  {
    id: 'cu-015', name: 'Mixed Vegetable Curry', hindiName: 'मिक्स वेज करी', category: 'curries', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 85, protein: 2.5, carbs: 10.0, fat: 4.0, fiber: 3.0, iron: 1.0, calcium: 30, vitaminC: 12 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry', 'low-calorie', 'high-fiber'],
  },
  {
    id: 'cu-016', name: 'Chicken Korma', hindiName: 'चिकन कोरमा', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 185, protein: 13.0, carbs: 6.0, fat: 12.5, fiber: 0.5, iron: 1.5, calcium: 35, vitaminC: 2 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein', 'rich'],
  },
  {
    id: 'cu-017', name: 'Matar Paneer', hindiName: 'मटर पनीर', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 165, protein: 8.5, carbs: 8.0, fat: 11.5, fiber: 2.0, iron: 1.2, calcium: 130, vitaminC: 5 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry'],
  },
  {
    id: 'cu-018', name: 'Prawn Curry', hindiName: 'झींगा करी', category: 'curries', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 120, protein: 15.0, carbs: 4.0, fat: 5.0, fiber: 0.5, iron: 1.5, calcium: 50, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  // ===== NORTH INDIAN =====
  {
    id: 'ni-001', name: 'Tandoori Chicken', hindiName: 'तंदूरी चिकन', category: 'north-indian', region: 'north',
    servingSize: 200, servingUnit: 'plate',
    nutritionPer100g: { calories: 150, protein: 18.0, carbs: 3.0, fat: 7.5, fiber: 0.5, iron: 1.5, calcium: 15, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['dinner', 'main-course', 'high-protein', 'tandoori'],
  },
  {
    id: 'ni-002', name: 'Seekh Kebab', hindiName: 'सीख कबाब', category: 'north-indian', region: 'north',
    servingSize: 60, servingUnit: 'piece',
    nutritionPer100g: { calories: 200, protein: 16.0, carbs: 5.0, fat: 13.0, fiber: 0.5, iron: 2.0, calcium: 15, vitaminC: 2 },
    isVegetarian: false, isVegan: false, tags: ['dinner', 'snack', 'main-course', 'high-protein', 'tandoori'],
  },
  {
    id: 'ni-003', name: 'Chole Bhature', hindiName: 'छोले भटूरे', category: 'north-indian', region: 'north',
    servingSize: 300, servingUnit: 'plate',
    nutritionPer100g: { calories: 230, protein: 7.0, carbs: 28.0, fat: 10.0, fiber: 3.5, iron: 2.0, calcium: 35, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['breakfast', 'lunch', 'main-course'],
  },
  {
    id: 'ni-004', name: 'Paneer Bhurji', hindiName: 'पनीर भुर्जी', category: 'north-indian', region: 'north',
    servingSize: 150, servingUnit: 'plate',
    nutritionPer100g: { calories: 190, protein: 12.0, carbs: 4.0, fat: 14.5, fiber: 0.5, iron: 0.8, calcium: 200, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['breakfast', 'lunch', 'main-course', 'high-protein'],
  },
  {
    id: 'ni-005', name: 'Chicken Tikka', hindiName: 'चिकन टिक्का', category: 'north-indian', region: 'north',
    servingSize: 150, servingUnit: 'plate',
    nutritionPer100g: { calories: 165, protein: 20.0, carbs: 4.0, fat: 8.0, fiber: 0.5, iron: 1.5, calcium: 15, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['dinner', 'snack', 'high-protein', 'tandoori'],
  },
  {
    id: 'ni-006', name: 'Keema (Minced Meat)', hindiName: 'कीमा', category: 'north-indian', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 170, protein: 14.0, carbs: 5.0, fat: 10.5, fiber: 1.0, iron: 2.5, calcium: 20, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'high-protein'],
  },
  {
    id: 'ni-007', name: 'Sarson ka Saag', hindiName: 'सरसों का साग', category: 'north-indian', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 80, protein: 3.0, carbs: 6.0, fat: 5.0, fiber: 3.5, iron: 3.0, calcium: 100, vitaminC: 20 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'high-fiber', 'seasonal'],
  },
  {
    id: 'ni-008', name: 'Makki ki Roti', hindiName: 'मक्की की रोटी', category: 'north-indian', region: 'north',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 240, protein: 5.0, carbs: 42.0, fat: 6.0, fiber: 4.0, iron: 1.5, calcium: 15, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'seasonal'],
  },
  // ===== VEGETABLES =====
  {
    id: 've-001', name: 'Aloo Sabzi (Dry)', hindiName: 'आलू सब्जी', category: 'vegetables', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 110, protein: 2.0, carbs: 15.0, fat: 5.0, fiber: 1.5, iron: 0.6, calcium: 10, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'curry'],
  },
  {
    id: 've-002', name: 'Lauki Sabzi (Bottle Gourd)', hindiName: 'लौकी सब्जी', category: 'vegetables', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 50, protein: 1.5, carbs: 6.0, fat: 2.5, fiber: 1.5, iron: 0.5, calcium: 20, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'low-calorie', 'light'],
  },
  {
    id: 've-003', name: 'Tinda Masala', hindiName: 'टिंडा मसाला', category: 'vegetables', region: 'north',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 55, protein: 1.5, carbs: 7.0, fat: 2.5, fiber: 1.5, iron: 0.5, calcium: 15, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'low-calorie'],
  },
  {
    id: 've-004', name: 'Palak Sabzi (Spinach)', hindiName: 'पालक सब्जी', category: 'vegetables', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 65, protein: 3.0, carbs: 4.0, fat: 4.0, fiber: 2.5, iron: 3.5, calcium: 100, vitaminC: 25 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'low-calorie', 'high-fiber'],
  },
  {
    id: 've-005', name: 'Gobhi Sabzi (Cauliflower)', hindiName: 'गोभी सब्जी', category: 'vegetables', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 75, protein: 2.5, carbs: 7.0, fat: 4.0, fiber: 2.5, iron: 0.7, calcium: 25, vitaminC: 25 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'low-calorie'],
  },
  {
    id: 've-006', name: 'Karela Sabzi (Bitter Gourd)', hindiName: 'करेला सब्जी', category: 'vegetables', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 60, protein: 2.0, carbs: 5.0, fat: 3.5, fiber: 3.0, iron: 1.0, calcium: 15, vitaminC: 30 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'low-calorie', 'high-fiber'],
  },
  {
    id: 've-007', name: 'Cabbage Poriyal', hindiName: 'पत्तागोभी पोरियल', category: 'vegetables', region: 'south',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 60, protein: 2.0, carbs: 6.0, fat: 3.0, fiber: 2.5, iron: 0.5, calcium: 40, vitaminC: 20 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'low-calorie', 'south-indian'],
  },
  {
    id: 've-008', name: 'Beans Poriyal', hindiName: 'बीन्स पोरियल', category: 'vegetables', region: 'south',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 70, protein: 2.5, carbs: 8.0, fat: 3.0, fiber: 3.5, iron: 1.0, calcium: 30, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'high-fiber', 'south-indian'],
  },
  {
    id: 've-009', name: 'Methi Aloo', hindiName: 'मेथी आलू', category: 'vegetables', region: 'north',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 100, protein: 2.5, carbs: 12.0, fat: 5.0, fiber: 2.0, iron: 2.0, calcium: 40, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish'],
  },
  {
    id: 've-010', name: 'Tori/Turai Sabzi (Ridge Gourd)', hindiName: 'तोरी सब्जी', category: 'vegetables', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 50, protein: 1.5, carbs: 5.0, fat: 2.5, fiber: 2.0, iron: 0.5, calcium: 15, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'low-calorie', 'light'],
  },
  // ===== SNACKS & STREET FOOD =====
  {
    id: 'sn-001', name: 'Samosa', hindiName: 'समोसा', category: 'snacks', region: 'pan-indian',
    servingSize: 60, servingUnit: 'piece',
    nutritionPer100g: { calories: 280, protein: 5.0, carbs: 28.0, fat: 16.0, fiber: 2.0, iron: 1.0, calcium: 15, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'street-food'],
  },
  {
    id: 'sn-002', name: 'Pakora (Onion)', hindiName: 'पकोड़ा', category: 'snacks', region: 'pan-indian',
    servingSize: 30, servingUnit: 'piece',
    nutritionPer100g: { calories: 270, protein: 6.0, carbs: 24.0, fat: 16.0, fiber: 2.0, iron: 1.5, calcium: 30, vitaminC: 4 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'street-food'],
  },
  {
    id: 'sn-003', name: 'Vada Pav', hindiName: 'वड़ा पाव', category: 'snacks', region: 'west',
    servingSize: 120, servingUnit: 'piece',
    nutritionPer100g: { calories: 250, protein: 4.5, carbs: 32.0, fat: 12.0, fiber: 2.0, iron: 1.0, calcium: 15, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'street-food', 'maharashtrian'],
  },
  {
    id: 'sn-004', name: 'Pav Bhaji', hindiName: 'पाव भाजी', category: 'snacks', region: 'west',
    servingSize: 250, servingUnit: 'plate',
    nutritionPer100g: { calories: 170, protein: 4.0, carbs: 22.0, fat: 7.5, fiber: 2.5, iron: 1.0, calcium: 20, vitaminC: 10 },
    isVegetarian: true, isVegan: false, tags: ['snack', 'dinner', 'street-food', 'maharashtrian'],
  },
  {
    id: 'sn-005', name: 'Bhel Puri', hindiName: 'भेल पूरी', category: 'snacks', region: 'west',
    servingSize: 100, servingUnit: 'plate',
    nutritionPer100g: { calories: 200, protein: 4.0, carbs: 30.0, fat: 7.0, fiber: 2.0, iron: 1.5, calcium: 15, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'street-food'],
  },
  {
    id: 'sn-006', name: 'Pani Puri / Golgappa', hindiName: 'पानी पूरी', category: 'snacks', region: 'pan-indian',
    servingSize: 15, servingUnit: 'piece',
    nutritionPer100g: { calories: 240, protein: 4.0, carbs: 35.0, fat: 9.0, fiber: 2.0, iron: 1.0, calcium: 15, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'street-food'],
  },
  {
    id: 'sn-007', name: 'Dahi Puri', hindiName: 'दही पूरी', category: 'snacks', region: 'west',
    servingSize: 120, servingUnit: 'plate',
    nutritionPer100g: { calories: 180, protein: 4.0, carbs: 25.0, fat: 7.0, fiber: 1.5, iron: 1.0, calcium: 40, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['snack', 'street-food'],
  },
  {
    id: 'sn-008', name: 'Kachori', hindiName: 'कचौरी', category: 'snacks', region: 'north',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 330, protein: 6.0, carbs: 30.0, fat: 20.0, fiber: 2.5, iron: 1.5, calcium: 20, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'street-food'],
  },
  {
    id: 'sn-009', name: 'Aloo Tikki', hindiName: 'आलू टिक्की', category: 'snacks', region: 'north',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 210, protein: 3.5, carbs: 25.0, fat: 11.0, fiber: 2.0, iron: 0.8, calcium: 15, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'street-food'],
  },
  {
    id: 'sn-010', name: 'Dhokla', hindiName: 'ढोकला', category: 'snacks', region: 'west',
    servingSize: 60, servingUnit: 'piece',
    nutritionPer100g: { calories: 155, protein: 6.0, carbs: 22.0, fat: 4.5, fiber: 2.0, iron: 1.5, calcium: 30, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'gujarati', 'steamed', 'light'],
  },
  {
    id: 'sn-011', name: 'Khandvi', hindiName: 'खांडवी', category: 'snacks', region: 'west',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 140, protein: 5.5, carbs: 18.0, fat: 5.0, fiber: 1.5, iron: 1.0, calcium: 40, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['snack', 'gujarati', 'light'],
  },
  {
    id: 'sn-012', name: 'Murukku', hindiName: 'मुरुक्कू', category: 'snacks', region: 'south',
    servingSize: 30, servingUnit: 'piece',
    nutritionPer100g: { calories: 450, protein: 8.0, carbs: 52.0, fat: 23.0, fiber: 2.5, iron: 2.0, calcium: 20, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'south-indian'],
  },
  {
    id: 'sn-013', name: 'Poha', hindiName: 'पोहा', category: 'snacks', region: 'west',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 2.5, carbs: 22.0, fat: 4.0, fiber: 1.0, iron: 4.0, calcium: 10, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'snack', 'light'],
  },
  {
    id: 'sn-014', name: 'Misal Pav', hindiName: 'मिसल पाव', category: 'snacks', region: 'west',
    servingSize: 250, servingUnit: 'plate',
    nutritionPer100g: { calories: 160, protein: 6.0, carbs: 20.0, fat: 6.0, fiber: 3.0, iron: 2.0, calcium: 25, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'snack', 'maharashtrian', 'high-fiber'],
  },
  {
    id: 'sn-015', name: 'Masala Papad', hindiName: 'मसाला पापड़', category: 'snacks', region: 'pan-indian',
    servingSize: 15, servingUnit: 'piece',
    nutritionPer100g: { calories: 310, protein: 20.0, carbs: 42.0, fat: 5.0, fiber: 4.0, iron: 3.0, calcium: 60, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'accompaniment', 'side-dish'],
  },
  // ===== BEVERAGES =====
  {
    id: 'bv-001', name: 'Masala Chai', hindiName: 'मसाला चाय', category: 'beverages', region: 'pan-indian',
    servingSize: 150, servingUnit: 'cup',
    nutritionPer100g: { calories: 45, protein: 1.5, carbs: 6.0, fat: 1.5, fiber: 0, iron: 0.2, calcium: 50, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'breakfast', 'snack'],
  },
  {
    id: 'bv-002', name: 'Black Tea', hindiName: 'काली चाय', category: 'beverages', region: 'pan-indian',
    servingSize: 150, servingUnit: 'cup',
    nutritionPer100g: { calories: 2, protein: 0, carbs: 0.5, fat: 0, fiber: 0, iron: 0.1, calcium: 2, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['beverage', 'breakfast', 'snack', 'low-calorie'],
  },
  {
    id: 'bv-003', name: 'Filter Coffee', hindiName: 'फ़िल्टर कॉफ़ी', category: 'beverages', region: 'south',
    servingSize: 150, servingUnit: 'cup',
    nutritionPer100g: { calories: 50, protein: 1.5, carbs: 6.0, fat: 2.0, fiber: 0, iron: 0.1, calcium: 50, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'breakfast', 'snack', 'south-indian'],
  },
  {
    id: 'bv-004', name: 'Sweet Lassi', hindiName: 'मीठी लस्सी', category: 'beverages', region: 'north',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 70, protein: 2.5, carbs: 11.0, fat: 2.0, fiber: 0, iron: 0.1, calcium: 80, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'snack'],
  },
  {
    id: 'bv-005', name: 'Salted Lassi', hindiName: 'नमकीन लस्सी', category: 'beverages', region: 'north',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 40, protein: 2.5, carbs: 4.0, fat: 1.5, fiber: 0, iron: 0.1, calcium: 80, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'snack', 'low-calorie'],
  },
  {
    id: 'bv-006', name: 'Mango Lassi', hindiName: 'आम लस्सी', category: 'beverages', region: 'north',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 85, protein: 2.5, carbs: 15.0, fat: 2.0, fiber: 0.5, iron: 0.2, calcium: 70, vitaminC: 10 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'snack'],
  },
  {
    id: 'bv-007', name: 'Chaas / Buttermilk', hindiName: 'छाछ', category: 'beverages', region: 'pan-indian',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 25, protein: 1.5, carbs: 3.0, fat: 0.5, fiber: 0, iron: 0.1, calcium: 50, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'lunch', 'snack', 'low-calorie', 'light'],
  },
  {
    id: 'bv-008', name: 'Nimbu Pani (Lemon Water)', hindiName: 'नींबू पानी', category: 'beverages', region: 'pan-indian',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 20, protein: 0.1, carbs: 5.0, fat: 0, fiber: 0, iron: 0.1, calcium: 5, vitaminC: 15 },
    isVegetarian: true, isVegan: true, tags: ['beverage', 'snack', 'low-calorie'],
  },
  {
    id: 'bv-009', name: 'Jaljeera', hindiName: 'जलजीरा', category: 'beverages', region: 'north',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 15, protein: 0.2, carbs: 3.5, fat: 0.1, fiber: 0, iron: 0.5, calcium: 8, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['beverage', 'snack', 'low-calorie'],
  },
  {
    id: 'bv-010', name: 'Badam Milk', hindiName: 'बादाम दूध', category: 'beverages', region: 'pan-indian',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 80, protein: 4.0, carbs: 8.0, fat: 3.5, fiber: 0.5, iron: 0.5, calcium: 120, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'snack', 'high-protein'],
  },
  // ===== FRUITS =====
  {
    id: 'fr-001', name: 'Mango', hindiName: 'आम', category: 'fruits', region: 'pan-indian',
    servingSize: 150, servingUnit: 'piece',
    nutritionPer100g: { calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4, fiber: 1.6, iron: 0.2, calcium: 11, vitaminC: 36 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'fruit'],
  },
  {
    id: 'fr-002', name: 'Banana', hindiName: 'केला', category: 'fruits', region: 'pan-indian',
    servingSize: 120, servingUnit: 'piece',
    nutritionPer100g: { calories: 89, protein: 1.1, carbs: 23.0, fat: 0.3, fiber: 2.6, iron: 0.3, calcium: 5, vitaminC: 9 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'fruit'],
  },
  {
    id: 'fr-003', name: 'Apple', hindiName: 'सेब', category: 'fruits', region: 'pan-indian',
    servingSize: 180, servingUnit: 'piece',
    nutritionPer100g: { calories: 52, protein: 0.3, carbs: 14.0, fat: 0.2, fiber: 2.4, iron: 0.1, calcium: 6, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit'],
  },
  {
    id: 'fr-004', name: 'Papaya', hindiName: 'पपीता', category: 'fruits', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 43, protein: 0.5, carbs: 11.0, fat: 0.3, fiber: 1.7, iron: 0.3, calcium: 20, vitaminC: 62 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'fruit', 'low-calorie'],
  },
  {
    id: 'fr-005', name: 'Guava', hindiName: 'अमरूद', category: 'fruits', region: 'pan-indian',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 68, protein: 2.6, carbs: 14.0, fat: 1.0, fiber: 5.4, iron: 0.3, calcium: 18, vitaminC: 228 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit', 'high-fiber'],
  },
  {
    id: 'fr-006', name: 'Pomegranate', hindiName: 'अनार', category: 'fruits', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 83, protein: 1.7, carbs: 19.0, fat: 1.2, fiber: 4.0, iron: 0.3, calcium: 10, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit', 'high-fiber'],
  },
  {
    id: 'fr-007', name: 'Watermelon', hindiName: 'तरबूज', category: 'fruits', region: 'pan-indian',
    servingSize: 250, servingUnit: 'bowl',
    nutritionPer100g: { calories: 30, protein: 0.6, carbs: 8.0, fat: 0.2, fiber: 0.4, iron: 0.2, calcium: 7, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit', 'low-calorie'],
  },
  {
    id: 'fr-008', name: 'Chikoo (Sapota)', hindiName: 'चीकू', category: 'fruits', region: 'pan-indian',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 83, protein: 0.4, carbs: 20.0, fat: 1.1, fiber: 5.3, iron: 0.8, calcium: 21, vitaminC: 15 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit', 'high-fiber'],
  },
  {
    id: 'fr-009', name: 'Orange / Santra', hindiName: 'संतरा', category: 'fruits', region: 'pan-indian',
    servingSize: 130, servingUnit: 'piece',
    nutritionPer100g: { calories: 47, protein: 0.9, carbs: 12.0, fat: 0.1, fiber: 2.4, iron: 0.1, calcium: 40, vitaminC: 53 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit', 'low-calorie'],
  },
  {
    id: 'fr-010', name: 'Grapes', hindiName: 'अंगूर', category: 'fruits', region: 'pan-indian',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 69, protein: 0.7, carbs: 18.0, fat: 0.2, fiber: 0.9, iron: 0.4, calcium: 10, vitaminC: 11 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit'],
  },
  {
    id: 'fr-011', name: 'Pineapple', hindiName: 'अनानास', category: 'fruits', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 50, protein: 0.5, carbs: 13.0, fat: 0.1, fiber: 1.4, iron: 0.3, calcium: 13, vitaminC: 48 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit', 'low-calorie'],
  },
  {
    id: 'fr-012', name: 'Jackfruit (Ripe)', hindiName: 'कटहल', category: 'fruits', region: 'south',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 95, protein: 1.7, carbs: 23.0, fat: 0.6, fiber: 1.5, iron: 0.2, calcium: 24, vitaminC: 14 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'fruit'],
  },
  // ===== NON-VEG =====
  {
    id: 'nv-001', name: 'Chicken Breast (Grilled)', hindiName: 'ग्रिल्ड चिकन', category: 'non-veg', region: 'pan-indian',
    servingSize: 150, servingUnit: 'piece',
    nutritionPer100g: { calories: 165, protein: 31.0, carbs: 0, fat: 3.6, fiber: 0, iron: 1.0, calcium: 15, vitaminC: 0 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'low-calorie'],
  },
  {
    id: 'nv-002', name: 'Chicken Curry (Home-style)', hindiName: 'चिकन करी', category: 'non-veg', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 145, protein: 13.0, carbs: 5.0, fat: 8.0, fiber: 0.5, iron: 1.5, calcium: 20, vitaminC: 4 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  {
    id: 'nv-003', name: 'Mutton Curry', hindiName: 'मटन करी', category: 'non-veg', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 165, protein: 14.0, carbs: 4.0, fat: 10.5, fiber: 0.5, iron: 2.5, calcium: 18, vitaminC: 2 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  {
    id: 'nv-004', name: 'Fish Fry', hindiName: 'फिश फ्राई', category: 'non-veg', region: 'pan-indian',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 200, protein: 18.0, carbs: 8.0, fat: 11.0, fiber: 0.5, iron: 1.0, calcium: 20, vitaminC: 1 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'snack', 'main-course', 'high-protein'],
  },
  {
    id: 'nv-005', name: 'Chicken 65', hindiName: 'चिकन 65', category: 'non-veg', region: 'south',
    servingSize: 150, servingUnit: 'plate',
    nutritionPer100g: { calories: 220, protein: 16.0, carbs: 12.0, fat: 12.0, fiber: 0.5, iron: 1.0, calcium: 15, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['snack', 'dinner', 'high-protein', 'south-indian'],
  },
  {
    id: 'nv-006', name: 'Prawn Fry', hindiName: 'झींगा फ्राई', category: 'non-veg', region: 'south',
    servingSize: 100, servingUnit: 'plate',
    nutritionPer100g: { calories: 180, protein: 20.0, carbs: 6.0, fat: 8.0, fiber: 0.3, iron: 1.5, calcium: 40, vitaminC: 2 },
    isVegetarian: false, isVegan: false, tags: ['snack', 'dinner', 'high-protein'],
  },
  {
    id: 'nv-007', name: 'Liver Fry', hindiName: 'कलेजी फ्राई', category: 'non-veg', region: 'pan-indian',
    servingSize: 100, servingUnit: 'plate',
    nutritionPer100g: { calories: 175, protein: 26.0, carbs: 4.0, fat: 6.0, fiber: 0, iron: 9.0, calcium: 10, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['dinner', 'main-course', 'high-protein'],
  },
  {
    id: 'nv-008', name: 'Biryani Leg Piece', hindiName: 'बिरयानी लेग पीस', category: 'non-veg', region: 'pan-indian',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 190, protein: 17.0, carbs: 0, fat: 13.0, fiber: 0, iron: 1.2, calcium: 12, vitaminC: 0 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'high-protein'],
  },
  // ===== EGGS =====
  {
    id: 'eg-001', name: 'Boiled Egg', hindiName: 'उबला अंडा', category: 'eggs', region: 'pan-indian',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fiber: 0, iron: 1.2, calcium: 50, vitaminC: 0 },
    isVegetarian: false, isVegan: false, tags: ['breakfast', 'snack', 'high-protein'],
  },
  {
    id: 'eg-002', name: 'Egg Bhurji', hindiName: 'अंडा भुर्जी', category: 'eggs', region: 'pan-indian',
    servingSize: 100, servingUnit: 'plate',
    nutritionPer100g: { calories: 180, protein: 12.0, carbs: 3.0, fat: 13.5, fiber: 0.3, iron: 1.5, calcium: 50, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['breakfast', 'main-course', 'high-protein'],
  },
  {
    id: 'eg-003', name: 'Omelette (2 eggs)', hindiName: 'ऑमलेट', category: 'eggs', region: 'pan-indian',
    servingSize: 120, servingUnit: 'piece',
    nutritionPer100g: { calories: 170, protein: 11.0, carbs: 1.5, fat: 13.0, fiber: 0.2, iron: 1.5, calcium: 55, vitaminC: 2 },
    isVegetarian: false, isVegan: false, tags: ['breakfast', 'main-course', 'high-protein'],
  },
  {
    id: 'eg-004', name: 'Egg Paratha', hindiName: 'अंडा पराठा', category: 'eggs', region: 'north',
    servingSize: 120, servingUnit: 'piece',
    nutritionPer100g: { calories: 240, protein: 9.0, carbs: 28.0, fat: 10.0, fiber: 1.5, iron: 1.8, calcium: 40, vitaminC: 1 },
    isVegetarian: false, isVegan: false, tags: ['breakfast', 'main-course', 'high-protein'],
  },
  // ===== DAIRY =====
  {
    id: 'da-001', name: 'Paneer (Cottage Cheese)', hindiName: 'पनीर', category: 'dairy', region: 'pan-indian',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, fiber: 0, iron: 0.2, calcium: 476, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'snack', 'high-protein'],
  },
  {
    id: 'da-002', name: 'Curd / Dahi', hindiName: 'दही', category: 'dairy', region: 'pan-indian',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 60, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0, iron: 0.1, calcium: 120, vitaminC: 0.5 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment', 'light'],
  },
  {
    id: 'da-003', name: 'Raita (Mixed)', hindiName: 'रायता', category: 'dairy', region: 'pan-indian',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 50, protein: 2.5, carbs: 5.0, fat: 2.0, fiber: 0.5, iron: 0.2, calcium: 90, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment', 'low-calorie'],
  },
  {
    id: 'da-004', name: 'Milk (Full Cream)', hindiName: 'दूध', category: 'dairy', region: 'pan-indian',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 62, protein: 3.3, carbs: 4.8, fat: 3.3, fiber: 0, iron: 0, calcium: 120, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'breakfast', 'snack'],
  },
  {
    id: 'da-005', name: 'Milk (Toned)', hindiName: 'टोन्ड दूध', category: 'dairy', region: 'pan-indian',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 45, protein: 3.0, carbs: 4.5, fat: 1.5, fiber: 0, iron: 0, calcium: 120, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'breakfast', 'snack', 'low-calorie'],
  },
  {
    id: 'da-006', name: 'Ghee', hindiName: 'घी', category: 'dairy', region: 'pan-indian',
    servingSize: 5, servingUnit: 'teaspoon',
    nutritionPer100g: { calories: 900, protein: 0, carbs: 0, fat: 100.0, fiber: 0, iron: 0, calcium: 0, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['accompaniment'],
  },
  {
    id: 'da-007', name: 'Butter', hindiName: 'मक्खन', category: 'dairy', region: 'pan-indian',
    servingSize: 10, servingUnit: 'pat',
    nutritionPer100g: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81.0, fiber: 0, iron: 0, calcium: 24, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['accompaniment', 'breakfast'],
  },
  {
    id: 'da-008', name: 'Shrikhand', hindiName: 'श्रीखंड', category: 'dairy', region: 'west',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 180, protein: 4.0, carbs: 26.0, fat: 7.0, fiber: 0, iron: 0.2, calcium: 100, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['snack', 'sweet', 'gujarati'],
  },
  // ===== SWEETS =====
  {
    id: 'sw-001', name: 'Gulab Jamun', hindiName: 'गुलाब जामुन', category: 'sweets', region: 'pan-indian',
    servingSize: 40, servingUnit: 'piece',
    nutritionPer100g: { calories: 350, protein: 4.5, carbs: 50.0, fat: 15.0, fiber: 0.2, iron: 0.5, calcium: 60, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack'],
  },
  {
    id: 'sw-002', name: 'Rasgulla', hindiName: 'रसगुल्ला', category: 'sweets', region: 'east',
    servingSize: 40, servingUnit: 'piece',
    nutritionPer100g: { calories: 186, protein: 5.0, carbs: 32.0, fat: 4.5, fiber: 0, iron: 0.2, calcium: 80, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack', 'bengali'],
  },
  {
    id: 'sw-003', name: 'Jalebi', hindiName: 'जलेबी', category: 'sweets', region: 'pan-indian',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 380, protein: 3.0, carbs: 60.0, fat: 14.0, fiber: 0.2, iron: 0.5, calcium: 20, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack', 'breakfast'],
  },
  {
    id: 'sw-004', name: 'Kheer (Rice Pudding)', hindiName: 'खीर', category: 'sweets', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 135, protein: 3.5, carbs: 20.0, fat: 4.5, fiber: 0.2, iron: 0.2, calcium: 80, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack'],
  },
  {
    id: 'sw-005', name: 'Gajar Halwa', hindiName: 'गाजर हलवा', category: 'sweets', region: 'north',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 210, protein: 3.5, carbs: 28.0, fat: 10.0, fiber: 1.5, iron: 0.5, calcium: 60, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack', 'seasonal'],
  },
  {
    id: 'sw-006', name: 'Barfi (Kaju)', hindiName: 'काजू बर्फी', category: 'sweets', region: 'pan-indian',
    servingSize: 30, servingUnit: 'piece',
    nutritionPer100g: { calories: 420, protein: 8.0, carbs: 50.0, fat: 22.0, fiber: 0.5, iron: 1.0, calcium: 30, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack'],
  },
  {
    id: 'sw-007', name: 'Ladoo (Besan)', hindiName: 'बेसन लड्डू', category: 'sweets', region: 'pan-indian',
    servingSize: 30, servingUnit: 'piece',
    nutritionPer100g: { calories: 440, protein: 8.0, carbs: 45.0, fat: 25.0, fiber: 2.0, iron: 2.0, calcium: 30, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack'],
  },
  {
    id: 'sw-008', name: 'Rasmalai', hindiName: 'रसमलाई', category: 'sweets', region: 'east',
    servingSize: 50, servingUnit: 'piece',
    nutritionPer100g: { calories: 200, protein: 6.0, carbs: 26.0, fat: 8.0, fiber: 0, iron: 0.3, calcium: 100, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack', 'bengali'],
  },
  {
    id: 'sw-009', name: 'Payasam', hindiName: 'पायसम', category: 'sweets', region: 'south',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 145, protein: 3.5, carbs: 22.0, fat: 5.0, fiber: 0.5, iron: 0.3, calcium: 70, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'south-indian'],
  },
  {
    id: 'sw-010', name: 'Sandesh', hindiName: 'संदेश', category: 'sweets', region: 'east',
    servingSize: 30, servingUnit: 'piece',
    nutritionPer100g: { calories: 250, protein: 8.0, carbs: 35.0, fat: 9.0, fiber: 0, iron: 0.2, calcium: 120, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['sweet', 'snack', 'bengali'],
  },
  // ===== BENGALI =====
  {
    id: 'bn-001', name: 'Macher Jhol (Fish Curry)', hindiName: 'माछेर झोल', category: 'bengali', region: 'east',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 110, protein: 12.0, carbs: 5.0, fat: 5.0, fiber: 0.5, iron: 1.0, calcium: 25, vitaminC: 3 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein', 'bengali'],
  },
  {
    id: 'bn-002', name: 'Luchi', hindiName: 'लुची', category: 'bengali', region: 'east',
    servingSize: 25, servingUnit: 'piece',
    nutritionPer100g: { calories: 340, protein: 6.0, carbs: 40.0, fat: 17.0, fiber: 1.0, iron: 1.5, calcium: 15, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'lunch', 'side-dish', 'bengali'],
  },
  {
    id: 'bn-003', name: 'Aloo Posto', hindiName: 'आलू पोस्तो', category: 'bengali', region: 'east',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 3.5, carbs: 12.0, fat: 8.0, fiber: 1.5, iron: 1.0, calcium: 50, vitaminC: 6 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'bengali'],
  },
  {
    id: 'bn-004', name: 'Shukto', hindiName: 'शुक्तो', category: 'bengali', region: 'east',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 80, protein: 2.5, carbs: 8.0, fat: 4.0, fiber: 2.5, iron: 0.8, calcium: 30, vitaminC: 8 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'side-dish', 'bengali', 'high-fiber'],
  },
  // ===== GUJARATI =====
  {
    id: 'gj-001', name: 'Undhiyu', hindiName: 'ऊंधियू', category: 'gujarati', region: 'west',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 120, protein: 3.5, carbs: 12.0, fat: 6.5, fiber: 3.5, iron: 1.5, calcium: 30, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'gujarati', 'high-fiber', 'seasonal'],
  },
  {
    id: 'gj-002', name: 'Gujarati Dal', hindiName: 'गुजराती दाल', category: 'gujarati', region: 'west',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 90, protein: 4.5, carbs: 13.0, fat: 2.5, fiber: 2.0, iron: 1.2, calcium: 20, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'gujarati', 'light'],
  },
  {
    id: 'gj-003', name: 'Handvo', hindiName: 'हांडवो', category: 'gujarati', region: 'west',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 180, protein: 6.0, carbs: 24.0, fat: 6.5, fiber: 2.5, iron: 1.5, calcium: 25, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'gujarati'],
  },
  // ===== MAHARASHTRIAN =====
  {
    id: 'mh-001', name: 'Puran Poli', hindiName: 'पूरन पोळी', category: 'maharashtrian', region: 'west',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 280, protein: 6.0, carbs: 45.0, fat: 8.5, fiber: 2.5, iron: 1.5, calcium: 25, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'main-course', 'maharashtrian', 'sweet'],
  },
  {
    id: 'mh-002', name: 'Sabudana Khichdi', hindiName: 'साबूदाना खिचड़ी', category: 'maharashtrian', region: 'west',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 180, protein: 2.5, carbs: 28.0, fat: 7.0, fiber: 0.5, iron: 0.5, calcium: 10, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'snack', 'maharashtrian'],
  },
  {
    id: 'mh-003', name: 'Thalipeeth', hindiName: 'थालीपीठ', category: 'maharashtrian', region: 'west',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 250, protein: 8.0, carbs: 35.0, fat: 9.0, fiber: 4.0, iron: 2.5, calcium: 30, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'main-course', 'maharashtrian', 'high-fiber'],
  },
  // ===== KERALA =====
  {
    id: 'kl-001', name: 'Avial', hindiName: 'अवियल', category: 'kerala', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 95, protein: 2.0, carbs: 8.0, fat: 6.5, fiber: 3.0, iron: 0.8, calcium: 30, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'kerala', 'high-fiber'],
  },
  {
    id: 'kl-002', name: 'Puttu', hindiName: 'पुट्टू', category: 'kerala', region: 'south',
    servingSize: 150, servingUnit: 'piece',
    nutritionPer100g: { calories: 170, protein: 3.0, carbs: 30.0, fat: 4.5, fiber: 2.0, iron: 0.8, calcium: 10, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'kerala'],
  },
  {
    id: 'kl-003', name: 'Kerala Fish Curry', hindiName: 'केरला फिश करी', category: 'kerala', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 120, protein: 13.0, carbs: 4.0, fat: 6.0, fiber: 0.5, iron: 1.0, calcium: 30, vitaminC: 4 },
    isVegetarian: false, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein', 'kerala'],
  },
  {
    id: 'kl-004', name: 'Idiyappam', hindiName: 'इडियप्पम', category: 'kerala', region: 'south',
    servingSize: 60, servingUnit: 'piece',
    nutritionPer100g: { calories: 150, protein: 2.5, carbs: 32.0, fat: 1.0, fiber: 0.8, iron: 0.5, calcium: 8, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'dinner', 'kerala', 'light'],
  },
  // ===== RAJASTHANI =====
  {
    id: 'rj-001', name: 'Dal Baati Churma', hindiName: 'दाल बाटी चूरमा', category: 'rajasthani', region: 'north',
    servingSize: 300, servingUnit: 'plate',
    nutritionPer100g: { calories: 280, protein: 7.0, carbs: 35.0, fat: 12.5, fiber: 2.5, iron: 2.0, calcium: 30, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'rajasthani'],
  },
  {
    id: 'rj-002', name: 'Gatte ki Sabzi', hindiName: 'गट्टे की सब्जी', category: 'rajasthani', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 140, protein: 5.0, carbs: 12.0, fat: 8.0, fiber: 2.0, iron: 1.5, calcium: 50, vitaminC: 2 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry', 'rajasthani'],
  },
  {
    id: 'rj-003', name: 'Ker Sangri', hindiName: 'केर सांगरी', category: 'rajasthani', region: 'north',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 100, protein: 3.0, carbs: 10.0, fat: 5.5, fiber: 4.0, iron: 2.0, calcium: 35, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'rajasthani', 'high-fiber'],
  },
  // ===== PUNJABI =====
  {
    id: 'pj-001', name: 'Makki di Roti with Saag', hindiName: 'मक्की दी रोटी सरसों सा साग', category: 'punjabi', region: 'north',
    servingSize: 250, servingUnit: 'plate',
    nutritionPer100g: { calories: 140, protein: 3.5, carbs: 18.0, fat: 6.0, fiber: 3.5, iron: 2.5, calcium: 60, vitaminC: 12 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'punjabi', 'seasonal'],
  },
  {
    id: 'pj-002', name: 'Amritsari Kulcha', hindiName: 'अमृतसरी कुल्चा', category: 'punjabi', region: 'north',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 280, protein: 7.0, carbs: 38.0, fat: 11.0, fiber: 2.0, iron: 2.0, calcium: 35, vitaminC: 2 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'main-course', 'punjabi'],
  },
  {
    id: 'pj-003', name: 'Lassi (Thick Punjabi)', hindiName: 'पंजाबी लस्सी', category: 'punjabi', region: 'north',
    servingSize: 250, servingUnit: 'glass',
    nutritionPer100g: { calories: 75, protein: 3.0, carbs: 12.0, fat: 2.0, fiber: 0, iron: 0.1, calcium: 90, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['beverage', 'snack', 'punjabi'],
  },
  // ===== MORE STAPLES & COMMON ITEMS =====
  {
    id: 'st-001', name: 'Poori Bhaji', hindiName: 'पूरी भाजी', category: 'north-indian', region: 'pan-indian',
    servingSize: 200, servingUnit: 'plate',
    nutritionPer100g: { calories: 230, protein: 5.0, carbs: 28.0, fat: 11.0, fiber: 2.5, iron: 1.5, calcium: 18, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'main-course'],
  },
  {
    id: 'st-002', name: 'Rava Dosa', hindiName: 'रवा डोसा', category: 'south-indian', region: 'south',
    servingSize: 120, servingUnit: 'piece',
    nutritionPer100g: { calories: 175, protein: 3.0, carbs: 25.0, fat: 7.0, fiber: 0.8, iron: 0.8, calcium: 12, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian'],
  },
  {
    id: 'st-003', name: 'Paneer Do Pyaza', hindiName: 'पनीर दो प्याज़ा', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 180, protein: 10.0, carbs: 7.0, fat: 13.0, fiber: 1.0, iron: 0.8, calcium: 170, vitaminC: 4 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'main-course', 'curry'],
  },
  {
    id: 'st-004', name: 'Gobi Paratha', hindiName: 'गोभी पराठा', category: 'bread-roti', region: 'north',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 260, protein: 6.0, carbs: 35.0, fat: 11.0, fiber: 2.5, iron: 1.5, calcium: 25, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'main-course'],
  },
  {
    id: 'st-005', name: 'Methi Paratha', hindiName: 'मेथी पराठा', category: 'bread-roti', region: 'north',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 265, protein: 7.5, carbs: 36.0, fat: 10.0, fiber: 3.5, iron: 3.0, calcium: 40, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'main-course', 'high-fiber'],
  },
  {
    id: 'st-006', name: 'Moong Dal Cheela', hindiName: 'मूंग दाल चीला', category: 'south-indian', region: 'pan-indian',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 140, protein: 8.0, carbs: 18.0, fat: 4.0, fiber: 2.5, iron: 1.5, calcium: 25, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'snack', 'high-protein', 'high-fiber'],
  },
  {
    id: 'st-007', name: 'Besan Cheela', hindiName: 'बेसन चीला', category: 'north-indian', region: 'pan-indian',
    servingSize: 80, servingUnit: 'piece',
    nutritionPer100g: { calories: 160, protein: 7.0, carbs: 20.0, fat: 5.5, fiber: 3.0, iron: 2.0, calcium: 30, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'snack', 'high-protein', 'high-fiber'],
  },
  {
    id: 'st-008', name: 'Dahi Vada', hindiName: 'दही वड़ा', category: 'snacks', region: 'pan-indian',
    servingSize: 100, servingUnit: 'plate',
    nutritionPer100g: { calories: 150, protein: 5.5, carbs: 18.0, fat: 6.5, fiber: 1.5, iron: 1.0, calcium: 50, vitaminC: 2 },
    isVegetarian: true, isVegan: false, tags: ['snack', 'side-dish'],
  },
  {
    id: 'st-009', name: 'Dum Aloo', hindiName: 'दम आलू', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 2.5, carbs: 14.0, fat: 7.0, fiber: 1.5, iron: 0.8, calcium: 20, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry'],
  },
  {
    id: 'st-010', name: 'Mushroom Matar', hindiName: 'मशरूम मटर', category: 'curries', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 80, protein: 4.0, carbs: 8.0, fat: 3.5, fiber: 2.5, iron: 1.2, calcium: 15, vitaminC: 8 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry', 'low-calorie'],
  },
  {
    id: 'st-011', name: 'Chana Masala', hindiName: 'चना मसाला', category: 'dal-legumes', region: 'north',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 7.0, carbs: 16.0, fat: 4.5, fiber: 5.0, iron: 2.0, calcium: 35, vitaminC: 4 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'high-protein', 'high-fiber', 'curry'],
  },
  {
    id: 'st-012', name: 'Sprouts Salad', hindiName: 'अंकुरित सलाद', category: 'other', region: 'pan-indian',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 80, protein: 6.0, carbs: 10.0, fat: 1.5, fiber: 4.0, iron: 1.5, calcium: 20, vitaminC: 15 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'high-protein', 'high-fiber', 'low-calorie'],
  },
  {
    id: 'st-013', name: 'Cucumber Raita', hindiName: 'खीरे का रायता', category: 'dairy', region: 'pan-indian',
    servingSize: 100, servingUnit: 'bowl',
    nutritionPer100g: { calories: 40, protein: 2.0, carbs: 4.0, fat: 1.5, fiber: 0.3, iron: 0.1, calcium: 80, vitaminC: 3 },
    isVegetarian: true, isVegan: false, tags: ['lunch', 'dinner', 'side-dish', 'accompaniment', 'low-calorie'],
  },
  {
    id: 'st-014', name: 'Pickle (Mango)', hindiName: 'आम का अचार', category: 'other', region: 'pan-indian',
    servingSize: 10, servingUnit: 'teaspoon',
    nutritionPer100g: { calories: 190, protein: 1.0, carbs: 15.0, fat: 14.0, fiber: 1.0, iron: 1.5, calcium: 10, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['accompaniment', 'side-dish'],
  },
  {
    id: 'st-015', name: 'Chutney (Mint)', hindiName: 'पुदीने की चटनी', category: 'other', region: 'pan-indian',
    servingSize: 20, servingUnit: 'tablespoon',
    nutritionPer100g: { calories: 45, protein: 1.5, carbs: 6.0, fat: 1.5, fiber: 2.0, iron: 1.5, calcium: 15, vitaminC: 10 },
    isVegetarian: true, isVegan: true, tags: ['accompaniment', 'side-dish'],
  },
  {
    id: 'st-016', name: 'Vermicelli Upma (Semiya)', hindiName: 'सेवइयां उपमा', category: 'south-indian', region: 'south',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 150, protein: 3.5, carbs: 24.0, fat: 4.5, fiber: 1.0, iron: 0.8, calcium: 12, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian'],
  },
  {
    id: 'st-017', name: 'Idli Sambar', hindiName: 'इडली सांभर', category: 'south-indian', region: 'south',
    servingSize: 250, servingUnit: 'plate',
    nutritionPer100g: { calories: 90, protein: 3.5, carbs: 15.0, fat: 1.5, fiber: 1.5, iron: 1.0, calcium: 18, vitaminC: 4 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian', 'light'],
  },
  {
    id: 'st-018', name: 'Paneer Paratha', hindiName: 'पनीर पराठा', category: 'bread-roti', region: 'north',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 280, protein: 10.0, carbs: 30.0, fat: 13.0, fiber: 1.5, iron: 1.5, calcium: 120, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['breakfast', 'main-course', 'high-protein'],
  },
  {
    id: 'st-019', name: 'Pav Bhaji', hindiName: 'पाव भाजी', category: 'street-food', region: 'west',
    servingSize: 300, servingUnit: 'plate',
    nutritionPer100g: { calories: 170, protein: 4.0, carbs: 22.0, fat: 7.5, fiber: 2.5, iron: 1.2, calcium: 25, vitaminC: 10 },
    isVegetarian: true, isVegan: false, tags: ['dinner', 'snack', 'street-food', 'maharashtrian'],
  },
  {
    id: 'st-020', name: 'Sev Puri', hindiName: 'सेव पूरी', category: 'street-food', region: 'west',
    servingSize: 100, servingUnit: 'plate',
    nutritionPer100g: { calories: 220, protein: 4.0, carbs: 28.0, fat: 10.0, fiber: 2.0, iron: 1.0, calcium: 20, vitaminC: 5 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'street-food'],
  },
  // ===== ADDITIONAL HEALTHY OPTIONS =====
  {
    id: 'hl-001', name: 'Ragi Dosa', hindiName: 'रागी डोसा', category: 'south-indian', region: 'south',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 135, protein: 3.5, carbs: 22.0, fat: 3.5, fiber: 3.5, iron: 3.5, calcium: 300, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'south-indian', 'high-fiber'],
  },
  {
    id: 'hl-002', name: 'Oats Porridge', hindiName: 'ओट्स दलिया', category: 'other', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 70, protein: 2.5, carbs: 12.0, fat: 1.5, fiber: 2.0, iron: 0.8, calcium: 50, vitaminC: 0 },
    isVegetarian: true, isVegan: false, tags: ['breakfast', 'high-fiber', 'light', 'low-calorie'],
  },
  {
    id: 'hl-003', name: 'Daliya (Broken Wheat)', hindiName: 'दलिया', category: 'other', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 85, protein: 3.0, carbs: 15.0, fat: 1.5, fiber: 3.0, iron: 1.0, calcium: 15, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'high-fiber', 'light'],
  },
  {
    id: 'hl-004', name: 'Sprouts Chaat', hindiName: 'स्प्राउट्स चाट', category: 'other', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 100, protein: 6.5, carbs: 12.0, fat: 2.5, fiber: 4.0, iron: 2.0, calcium: 25, vitaminC: 12 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'breakfast', 'high-protein', 'high-fiber', 'low-calorie'],
  },
  {
    id: 'hl-005', name: 'Muesli with Milk', hindiName: 'मूसली', category: 'other', region: 'pan-indian',
    servingSize: 200, servingUnit: 'bowl',
    nutritionPer100g: { calories: 120, protein: 4.0, carbs: 18.0, fat: 3.5, fiber: 2.5, iron: 2.0, calcium: 80, vitaminC: 1 },
    isVegetarian: true, isVegan: false, tags: ['breakfast', 'high-fiber'],
  },
  {
    id: 'hl-006', name: 'Sattu Drink', hindiName: 'सत्तू', category: 'beverages', region: 'east',
    servingSize: 200, servingUnit: 'glass',
    nutritionPer100g: { calories: 55, protein: 3.5, carbs: 8.0, fat: 1.0, fiber: 1.5, iron: 1.5, calcium: 20, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['beverage', 'snack', 'high-protein'],
  },
  {
    id: 'hl-007', name: 'Roasted Chana', hindiName: 'भुने चने', category: 'snacks', region: 'pan-indian',
    servingSize: 30, servingUnit: 'handful',
    nutritionPer100g: { calories: 370, protein: 22.0, carbs: 50.0, fat: 6.0, fiber: 12.0, iron: 4.5, calcium: 60, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'high-protein', 'high-fiber'],
  },
  {
    id: 'hl-008', name: 'Mixed Dry Fruits', hindiName: 'मेवा', category: 'snacks', region: 'pan-indian',
    servingSize: 30, servingUnit: 'handful',
    nutritionPer100g: { calories: 520, protein: 15.0, carbs: 30.0, fat: 40.0, fiber: 6.0, iron: 3.0, calcium: 150, vitaminC: 1 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'high-protein'],
  },
  {
    id: 'hl-009', name: 'Peanuts (Roasted)', hindiName: 'भुनी मूंगफली', category: 'snacks', region: 'pan-indian',
    servingSize: 30, servingUnit: 'handful',
    nutritionPer100g: { calories: 567, protein: 26.0, carbs: 16.0, fat: 49.0, fiber: 8.5, iron: 2.0, calcium: 58, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['snack', 'high-protein', 'high-fiber'],
  },
  {
    id: 'hl-010', name: 'Coconut Water', hindiName: 'नारियल पानी', category: 'beverages', region: 'pan-indian',
    servingSize: 250, servingUnit: 'glass',
    nutritionPer100g: { calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2, fiber: 1.1, iron: 0.3, calcium: 24, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['beverage', 'snack', 'low-calorie'],
  },
  {
    id: 'hl-011', name: 'Ragi Mudde (Ragi Ball)', hindiName: 'रागी मुड्डे', category: 'south-indian', region: 'south',
    servingSize: 100, servingUnit: 'piece',
    nutritionPer100g: { calories: 120, protein: 2.5, carbs: 25.0, fat: 1.0, fiber: 3.5, iron: 3.8, calcium: 344, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'high-fiber', 'south-indian'],
  },
  {
    id: 'hl-012', name: 'Jowar Roti', hindiName: 'ज्वार रोटी', category: 'bread-roti', region: 'west',
    servingSize: 40, servingUnit: 'piece',
    nutritionPer100g: { calories: 240, protein: 7.5, carbs: 48.0, fat: 2.5, fiber: 5.0, iron: 3.0, calcium: 25, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'high-fiber'],
  },
  {
    id: 'hl-013', name: 'Bajra Roti', hindiName: 'बाजरा रोटी', category: 'bread-roti', region: 'west',
    servingSize: 40, servingUnit: 'piece',
    nutritionPer100g: { calories: 250, protein: 8.0, carbs: 46.0, fat: 4.0, fiber: 6.0, iron: 4.0, calcium: 30, vitaminC: 0 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'side-dish', 'high-fiber', 'rajasthani'],
  },
  {
    id: 'hl-014', name: 'Soya Chunks Curry', hindiName: 'सोया चंक्स करी', category: 'curries', region: 'pan-indian',
    servingSize: 150, servingUnit: 'bowl',
    nutritionPer100g: { calories: 130, protein: 15.0, carbs: 8.0, fat: 4.5, fiber: 2.0, iron: 3.5, calcium: 120, vitaminC: 3 },
    isVegetarian: true, isVegan: true, tags: ['lunch', 'dinner', 'main-course', 'curry', 'high-protein'],
  },
  {
    id: 'hl-015', name: 'Tofu Bhurji', hindiName: 'टोफू भुर्जी', category: 'other', region: 'pan-indian',
    servingSize: 150, servingUnit: 'plate',
    nutritionPer100g: { calories: 120, protein: 10.0, carbs: 3.0, fat: 7.5, fiber: 0.5, iron: 2.0, calcium: 150, vitaminC: 2 },
    isVegetarian: true, isVegan: true, tags: ['breakfast', 'lunch', 'main-course', 'high-protein'],
  },
];

// ===== SEARCH & FILTER FUNCTIONS =====

export function searchFoods(query: string, dietaryPref?: DietaryPreference): FoodItem[] {
  const lowerQuery = query.toLowerCase().trim();
  if (lowerQuery.length < 2) return [];

  let results = INDIAN_FOODS.filter((food) => {
    const nameMatch = food.name.toLowerCase().includes(lowerQuery);
    const hindiMatch = food.hindiName?.toLowerCase().includes(lowerQuery) ?? false;
    const tagMatch = food.tags.some((tag) => tag.includes(lowerQuery));
    const categoryMatch = food.category.includes(lowerQuery);
    return nameMatch || hindiMatch || tagMatch || categoryMatch;
  });

  // Apply dietary preference filter
  if (dietaryPref) {
    results = filterByDietaryPref(results, dietaryPref);
  }

  return results;
}

export function getFoodsByCategory(category: FoodCategory, dietaryPref?: DietaryPreference): FoodItem[] {
  let results = INDIAN_FOODS.filter((food) => food.category === category);

  if (dietaryPref) {
    results = filterByDietaryPref(results, dietaryPref);
  }

  return results;
}

function filterByDietaryPref(foods: FoodItem[], pref: DietaryPreference): FoodItem[] {
  switch (pref) {
    case 'vegetarian':
      return foods.filter((f) => f.isVegetarian);
    case 'eggetarian':
      return foods.filter((f) => f.isVegetarian || f.category === 'eggs');
    case 'non_vegetarian':
    default:
      return foods;
  }
}
