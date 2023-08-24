export default function generateAgeGroup(age) {
  if (age <= 20) {
    return { Age_20_Nov: [1] };
  } else if (age <= 30) {
    return { Age_21_30: [1] };
  } else if (age <= 40) {
    return { Age_31_40: [1] };
  } else if (age <= 50) {
    return { Age_41_50: [1] };
  } else if (age <= 60) {
    return { Age_51_60: [1] };
  } else if (age <= 70) {
    return { Age_61_70: [1] };
  } else if (age <= 80) {
    return { Age_71_80: [1] };
  } else if (age <= 90) {
    return { Age_81_90: [1] };
  } else {
    return { Age_91_100: [1] };
  }
}
