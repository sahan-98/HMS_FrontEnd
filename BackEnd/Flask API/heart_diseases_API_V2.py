import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the trained CatBoost model from the pickle file
model = pickle.load(open("modelV3.pkl", "rb"))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        age = data['age']
        sex = data['sex']
        chest_pain_type = data['chest_pain_type']
        resting_bp = data['resting_bp']
        cholesterol = data['cholesterol']
        fasting_bs = data['fasting_bs']
        resting_ecg = data['resting_ecg']
        max_hr = data['max_hr']
        exercise_angina = data['exercise_angina']
        oldpeak = data['oldpeak']
        st_slope = data['st_slope']

        # Convert categorical features to numerical codes
#         sex_mapping = {'male': 1, 'female': 0}
#         chest_pain_mapping = {'typical angina': 1, 'atypical angina': 2, 'non-anginal pain': 3, 'asymptomatic': 4}
#         resting_ecg_mapping = {'normal': 0, 'ST-T wave abnormality': 1, 'left ventricular hypertrophy': 2}
#         exercise_angina_mapping = {'yes': 1, 'no': 0}
#         st_slope_mapping = {'upsloping': 1, 'flat': 2, 'downsloping': 3}

#         sex = sex_mapping[sex]
#         chest_pain_type = chest_pain_mapping[chest_pain_type]
#         resting_ecg = resting_ecg_mapping[resting_ecg]
#         exercise_angina = exercise_angina_mapping[exercise_angina]
#         st_slope = st_slope_mapping[st_slope]

        # Make the prediction using the model
        prediction = model.predict([[age, sex, chest_pain_type, resting_bp, cholesterol, fasting_bs,
                                     resting_ecg, max_hr, exercise_angina, oldpeak, st_slope]])

        result = {'prediction': bool(prediction[0])}
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=5000)
