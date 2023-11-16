from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the trained XGBoost model from the pickle file
loaded_model = pickle.load(open("bed_model.pkl", "rb"))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the request
        data = request.get_json(force=True)

        # Create a DataFrame from the received JSON data
        new_data = pd.DataFrame({
            'Available_Extra_Rooms_in_Hospital': data['Available_Extra_Rooms_in_Hospital'],
            'staff_available': data['staff_available'],
            'Visitors_with_Patient': data['Visitors_with_Patient'],
            'Admission_Deposit': data['Admission_Deposit'],
            'Ward_Facility_Code_B': data['Ward_Facility_Code_B'],
            'Ward_Facility_Code_C': data['Ward_Facility_Code_C'],
            'Ward_Facility_Code_D': data['Ward_Facility_Code_D'],
            'Ward_Facility_Code_E': data['Ward_Facility_Code_E'],
            'Ward_Facility_Code_F': data['Ward_Facility_Code_F'],
            'Age_20-Nov': data['Age_20_Nov'],
            'Age_21-30': data['Age_21_30'],
            'Age_31-40': data['Age_31_40'],
            'Age_41-50': data['Age_41_50'],
            'Age_51-60': data['Age_51_60'],
            'Age_61-70': data['Age_61_70'],
            'Age_71-80': data['Age_71_80'],
            'Age_81-90': data['Age_81_90'],
            'Age_91-100': data['Age_91_100'],
            'gender_Male': data['gender_Male'],
            'gender_Other': data['gender_Other'],
            'Type_of_Admission_Trauma': data['Type_of_Admission_Trauma'],
            'Type_of_Admission_Urgent': data['Type_of_Admission_Urgent'],
            'Severity_of_Illness_Minor': data['Severity_of_Illness_Minor'],
            'Severity_of_Illness_Moderate': data['Severity_of_Illness_Moderate'],
            'Insurance_Yes': data['Insurance_Yes']
        })

        # Make predictions using the loaded model
        predicted_stay = loaded_model.predict(new_data)
        
        # Return the predictions as JSON response
        response = {
            "predicted_stay": predicted_stay.tolist()
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
