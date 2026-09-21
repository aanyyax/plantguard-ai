const diseaseData = {

    Pepper__bell___Bacterial_spot: {
        plant: "Pepper",
        disease: "Bacterial Spot",
        type: "Bacterial Disease",
        category: "Disease",
        severity: "Moderate",
        cause: "Bacteria of the Xanthomonas group",

        description:
            "Bacterial spot is a common disease of pepper plants that can affect leaves, stems and fruits. The disease can reduce plant vigor and fruit quality when conditions are favorable for bacterial development.",

        symptoms: [
            "Small water-soaked spots may appear on leaves.",
            "Spots can become dark brown or black.",
            "Leaves may develop yellowing around infected areas.",
            "Fruit may develop raised or scabby lesions.",
            "Severe infection can result in premature leaf drop."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Fruits"
        ],

        favorableConditions: [
            "Warm temperatures",
            "High humidity",
            "Frequent rainfall",
            "Wet foliage"
        ],

        riskFactors: [
            "Overhead irrigation",
            "Poor air circulation",
            "Infected plant debris",
            "Splashing water"
        ],

        prevention: [
            "Use healthy planting material.",
            "Avoid unnecessary overhead watering.",
            "Maintain good spacing between plants.",
            "Remove severely infected plant material.",
            "Keep the growing area clean."
        ],

        management: [
            "Remove heavily infected leaves where practical.",
            "Improve airflow around plants.",
            "Avoid working with plants while foliage is wet.",
            "Use locally recommended disease-management products when appropriate."
        ]
    },


    Pepper__bell___healthy: {
        plant: "Pepper",
        disease: "Healthy Pepper Plant",
        type: "Healthy",
        category: "Healthy",
        severity: "None",
        cause: "No disease pattern detected",

        description:
            "The image does not show a disease pattern corresponding to the disease classes used by the PlantGuard AI model.",

        symptoms: [
            "No major disease symptoms detected by the model.",
            "Leaf appearance is consistent with the healthy class."
        ],

        affectedParts: [
            "None detected"
        ],

        favorableConditions: [
            "Balanced watering",
            "Adequate sunlight",
            "Good air circulation",
            "Healthy soil conditions"
        ],

        riskFactors: [
            "Excessive moisture",
            "Nutrient imbalance",
            "Pest infestation",
            "Poor sanitation"
        ],

        prevention: [
            "Continue regular plant monitoring.",
            "Maintain balanced irrigation.",
            "Provide adequate sunlight.",
            "Keep the growing area clean."
        ],

        management: [
            "No disease-specific treatment is indicated from this prediction.",
            "Continue routine plant health monitoring."
        ]
    },


    Potato___Early_blight: {
        plant: "Potato",
        disease: "Early Blight",
        type: "Fungal Disease",
        category: "Disease",
        severity: "Moderate",
        cause: "Alternaria species",

        description:
            "Potato early blight is a fungal disease that primarily affects foliage and can reduce the plant's ability to produce healthy tubers.",

        symptoms: [
            "Dark brown lesions may develop on older leaves.",
            "Lesions may form concentric ring patterns.",
            "Yellowing can occur around affected tissue.",
            "Severe infection can cause premature leaf death.",
            "Disease can reduce plant vigor and yield."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Tubers"
        ],

        favorableConditions: [
            "Warm weather",
            "High humidity",
            "Leaf wetness",
            "Plant stress"
        ],

        riskFactors: [
            "Poor crop rotation",
            "Infected crop residue",
            "Plant stress",
            "High humidity"
        ],

        prevention: [
            "Use healthy seed material.",
            "Practice crop rotation.",
            "Remove infected plant debris.",
            "Maintain adequate plant nutrition.",
            "Avoid prolonged leaf wetness."
        ],

        management: [
            "Monitor lower and older leaves regularly.",
            "Remove severely affected foliage where appropriate.",
            "Maintain plant vigor through proper nutrition and irrigation.",
            "Follow locally recommended fungicide programs when necessary."
        ]
    },


    Potato___healthy: {
        plant: "Potato",
        disease: "Healthy Potato Plant",
        type: "Healthy",
        category: "Healthy",
        severity: "None",
        cause: "No disease pattern detected",

        description:
            "The analyzed image is classified as healthy by the PlantGuard AI model and does not match the disease patterns represented in the dataset.",

        symptoms: [
            "No major disease symptoms detected.",
            "Leaf appearance corresponds to the healthy class."
        ],

        affectedParts: [
            "None detected"
        ],

        favorableConditions: [
            "Balanced irrigation",
            "Adequate sunlight",
            "Good soil drainage",
            "Healthy crop management"
        ],

        riskFactors: [
            "Excess moisture",
            "Poor drainage",
            "Nutrient deficiencies",
            "Pest pressure"
        ],

        prevention: [
            "Monitor plants regularly.",
            "Maintain proper irrigation.",
            "Use healthy planting material.",
            "Maintain good field sanitation."
        ],

        management: [
            "Continue routine crop monitoring.",
            "No disease-specific treatment is indicated from this prediction."
        ]
    },


    Potato___Late_blight: {
        plant: "Potato",
        disease: "Late Blight",
        type: "Oomycete Disease",
        category: "Disease",
        severity: "High",
        cause: "Phytophthora infestans",

        description:
            "Late blight is a destructive disease of potato that can rapidly damage foliage and stems and can also affect tubers. Under favorable conditions, disease development can be very rapid.",

        symptoms: [
            "Dark water-soaked lesions may develop on leaves.",
            "Lesions can expand rapidly under favorable conditions.",
            "White fungal-like growth may occur around lesions under humid conditions.",
            "Stems can develop dark lesions.",
            "Tubers may develop brown or reddish-brown internal discoloration."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Tubers"
        ],

        favorableConditions: [
            "Cool to moderate temperatures",
            "High humidity",
            "Extended leaf wetness",
            "Frequent rainfall"
        ],

        riskFactors: [
            "High humidity",
            "Dense crop canopy",
            "Infected plant material",
            "Prolonged wet foliage"
        ],

        prevention: [
            "Use healthy planting material.",
            "Monitor crops frequently during favorable weather.",
            "Improve field airflow where possible.",
            "Remove infected plant material according to local recommendations."
        ],

        management: [
            "Inspect plants frequently.",
            "Act quickly when suspicious symptoms appear.",
            "Remove or manage infected material according to local agricultural guidance.",
            "Use locally recommended fungicide programs when appropriate."
        ]
    },


    Tomato_Bacterial_spot: {
        plant: "Tomato",
        disease: "Bacterial Spot",
        type: "Bacterial Disease",
        category: "Disease",
        severity: "Moderate",
        cause: "Xanthomonas species",

        description:
            "Tomato bacterial spot can affect leaves, stems and fruits. The disease is favored by warm, wet conditions and can reduce plant health and fruit quality.",

        symptoms: [
            "Small dark spots may appear on leaves.",
            "Leaf lesions can become surrounded by yellow tissue.",
            "Fruit may develop small raised lesions.",
            "Severe infections can cause leaf drop.",
            "Fruit quality may be reduced."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Fruits"
        ],

        favorableConditions: [
            "Warm temperatures",
            "High humidity",
            "Rainfall",
            "Wet foliage"
        ],

        riskFactors: [
            "Overhead irrigation",
            "Infected seeds or plant material",
            "Water splash",
            "Poor sanitation"
        ],

        prevention: [
            "Use healthy planting material.",
            "Avoid unnecessary overhead irrigation.",
            "Maintain good spacing.",
            "Remove infected plant debris.",
            "Disinfect tools when appropriate."
        ],

        management: [
            "Remove severely affected plant material.",
            "Reduce leaf wetness.",
            "Improve airflow.",
            "Follow locally recommended management practices."
        ]
    },


    Tomato_Early_blight: {
        plant: "Tomato",
        disease: "Early Blight",
        type: "Fungal Disease",
        category: "Disease",
        severity: "Moderate",
        cause: "Alternaria species",

        description:
            "Tomato early blight is a fungal disease that commonly affects older leaves first. It can spread upward through the plant and may also affect stems and fruit.",

        symptoms: [
            "Brown circular lesions on older leaves.",
            "Concentric ring patterns may appear inside lesions.",
            "Yellowing around affected areas.",
            "Progressive leaf death.",
            "Stem lesions may occur.",
            "Fruit may develop dark lesions near the stem."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Fruits"
        ],

        favorableConditions: [
            "Warm temperatures",
            "High humidity",
            "Leaf wetness",
            "Plant stress"
        ],

        riskFactors: [
            "Infected crop debris",
            "Poor airflow",
            "Repeated tomato cropping",
            "Nutrient stress"
        ],

        prevention: [
            "Remove infected plant debris.",
            "Maintain good plant spacing.",
            "Avoid prolonged leaf wetness.",
            "Use crop rotation where practical.",
            "Maintain balanced plant nutrition."
        ],

        management: [
            "Monitor lower leaves regularly.",
            "Remove severely affected foliage where appropriate.",
            "Maintain adequate plant nutrition and irrigation.",
            "Use locally recommended fungicide management when required."
        ]
    },


    Tomato_healthy: {
        plant: "Tomato",
        disease: "Healthy Tomato Plant",
        type: "Healthy",
        category: "Healthy",
        severity: "None",
        cause: "No disease pattern detected",

        description:
            "The model classified the uploaded image as a healthy tomato plant. No disease pattern corresponding to the trained disease classes was detected.",

        symptoms: [
            "No major disease symptoms detected.",
            "Leaf appearance is consistent with the healthy class."
        ],

        affectedParts: [
            "None detected"
        ],

        favorableConditions: [
            "Adequate sunlight",
            "Balanced irrigation",
            "Good airflow",
            "Healthy soil"
        ],

        riskFactors: [
            "Excess moisture",
            "Pest infestation",
            "Nutrient imbalance",
            "Poor sanitation"
        ],

        prevention: [
            "Inspect plants regularly.",
            "Maintain balanced watering.",
            "Provide adequate sunlight.",
            "Maintain good garden or field sanitation."
        ],

        management: [
            "Continue normal plant-care practices.",
            "Monitor for changes in leaf color, spots or deformation."
        ]
    },


    Tomato_Late_blight: {
        plant: "Tomato",
        disease: "Late Blight",
        type: "Oomycete Disease",
        category: "Disease",
        severity: "High",
        cause: "Phytophthora infestans",

        description:
            "Tomato late blight can develop rapidly under cool, wet and humid conditions. It can affect leaves, stems and fruit and may cause severe crop damage.",

        symptoms: [
            "Large irregular dark lesions on leaves.",
            "Water-soaked appearance may occur.",
            "White growth may appear under humid conditions.",
            "Stem lesions can develop.",
            "Fruit can develop firm dark lesions."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Fruits"
        ],

        favorableConditions: [
            "Cool temperatures",
            "High humidity",
            "Frequent rainfall",
            "Extended leaf wetness"
        ],

        riskFactors: [
            "Wet weather",
            "Poor airflow",
            "Dense plant canopy",
            "Infected plant material"
        ],

        prevention: [
            "Monitor plants during cool and wet weather.",
            "Maintain good airflow.",
            "Avoid unnecessary leaf wetness.",
            "Remove infected material according to local recommendations."
        ],

        management: [
            "Inspect plants frequently.",
            "Respond quickly to suspicious symptoms.",
            "Remove infected material according to local guidance.",
            "Use locally recommended disease-management practices."
        ]
    },


    Tomato_Leaf_Mold: {
        plant: "Tomato",
        disease: "Tomato Leaf Mold",
        type: "Fungal Disease",
        category: "Disease",
        severity: "Moderate",
        cause: "Cladosporium species",

        description:
            "Tomato leaf mold primarily affects leaves and is especially associated with humid conditions and poor air circulation.",

        symptoms: [
            "Yellow patches may appear on upper leaf surfaces.",
            "Olive-green or brown growth can appear on the underside of leaves.",
            "Leaves may curl or dry as disease progresses.",
            "Severe infections can reduce photosynthetic area."
        ],

        affectedParts: [
            "Leaves"
        ],

        favorableConditions: [
            "High humidity",
            "Poor ventilation",
            "Leaf wetness",
            "Dense foliage"
        ],

        riskFactors: [
            "Greenhouse humidity",
            "Poor airflow",
            "Dense planting",
            "Wet foliage"
        ],

        prevention: [
            "Improve ventilation.",
            "Avoid excessive humidity.",
            "Provide adequate plant spacing.",
            "Remove infected leaves where appropriate."
        ],

        management: [
            "Improve airflow around plants.",
            "Reduce humidity when possible.",
            "Remove heavily infected leaves.",
            "Follow locally recommended disease-management practices."
        ]
    },


    Tomato_Septoria_leaf_spot: {
        plant: "Tomato",
        disease: "Septoria Leaf Spot",
        type: "Fungal Disease",
        category: "Disease",
        severity: "Moderate",
        cause: "Septoria species",

        description:
            "Septoria leaf spot commonly begins on lower tomato leaves and can progressively reduce healthy foliage if conditions favor disease development.",

        symptoms: [
            "Small circular spots develop on leaves.",
            "Spots may have dark margins.",
            "Small dark structures can occur within lesions.",
            "Leaves may yellow and drop as infection progresses."
        ],

        affectedParts: [
            "Leaves"
        ],

        favorableConditions: [
            "Warm weather",
            "High humidity",
            "Frequent moisture",
            "Leaf wetness"
        ],

        riskFactors: [
            "Infected plant debris",
            "Water splash",
            "Dense foliage",
            "Poor sanitation"
        ],

        prevention: [
            "Remove infected plant debris.",
            "Avoid overhead watering.",
            "Improve airflow.",
            "Maintain adequate plant spacing."
        ],

        management: [
            "Remove severely affected lower leaves.",
            "Reduce leaf wetness.",
            "Maintain field sanitation.",
            "Follow locally recommended fungicide guidance when appropriate."
        ]
    },


    Tomato_Spider_mites_Two_spotted_spider_mite: {
        plant: "Tomato",
        disease: "Two-Spotted Spider Mite Damage",
        type: "Pest Damage",
        category: "Pest",
        severity: "Moderate",
        cause: "Two-spotted spider mite",

        description:
            "Two-spotted spider mites are tiny pests that feed on plant cells. Their feeding can cause stippling, yellowing and general loss of plant vigor.",

        symptoms: [
            "Fine yellow or pale stippling on leaves.",
            "Leaves may become bronze or yellow.",
            "Fine webbing can appear during heavier infestations.",
            "Severe infestations can cause leaf drying."
        ],

        affectedParts: [
            "Leaves"
        ],

        favorableConditions: [
            "Hot weather",
            "Dry conditions",
            "Low humidity"
        ],

        riskFactors: [
            "Hot dry weather",
            "Plant stress",
            "Dusty conditions",
            "Heavy infestations"
        ],

        prevention: [
            "Monitor the underside of leaves.",
            "Maintain adequate plant hydration.",
            "Encourage beneficial predatory organisms where appropriate.",
            "Avoid unnecessary broad-spectrum pesticide use."
        ],

        management: [
            "Inspect plants regularly.",
            "Use an appropriate integrated pest-management approach.",
            "Remove heavily infested leaves where practical.",
            "Follow locally recommended pest-control guidance."
        ]
    },


    Tomato__Target_Spot: {
        plant: "Tomato",
        disease: "Target Spot",
        type: "Fungal Disease",
        category: "Disease",
        severity: "Moderate",
        cause: "Corynespora cassiicola",

        description:
            "Tomato target spot is a fungal disease that can affect leaves, stems and fruit. Lesions often develop a characteristic target-like appearance.",

        symptoms: [
            "Circular brown lesions on leaves.",
            "Concentric rings may develop.",
            "Leaves may yellow around lesions.",
            "Fruit can develop dark sunken spots.",
            "Severe infection can cause defoliation."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Fruits"
        ],

        favorableConditions: [
            "Warm temperatures",
            "High humidity",
            "Extended leaf wetness"
        ],

        riskFactors: [
            "Dense foliage",
            "Poor airflow",
            "High humidity",
            "Infected debris"
        ],

        prevention: [
            "Maintain good airflow.",
            "Avoid prolonged leaf wetness.",
            "Remove infected plant debris.",
            "Maintain adequate plant spacing."
        ],

        management: [
            "Monitor leaves and fruit.",
            "Remove severely infected tissue where practical.",
            "Improve canopy ventilation.",
            "Use locally recommended disease-management products when appropriate."
        ]
    },


    Tomato__Tomato_mosaic_virus: {
        plant: "Tomato",
        disease: "Tomato Mosaic Virus",
        type: "Viral Disease",
        category: "Disease",
        severity: "High",
        cause: "Tomato mosaic virus",

        description:
            "Tomato mosaic virus can cause characteristic changes in leaf coloration and plant growth. Viral diseases require careful sanitation because infected plants can serve as sources of infection.",

        symptoms: [
            "Mosaic patterns of light and dark green may appear.",
            "Leaves can become distorted.",
            "Plant growth may become reduced.",
            "Fruit development and quality may be affected."
        ],

        affectedParts: [
            "Leaves",
            "Stems",
            "Fruits"
        ],

        favorableConditions: [
            "Presence of infected plant material",
            "Mechanical transmission",
            "Contaminated tools or hands"
        ],

        riskFactors: [
            "Poor sanitation",
            "Handling infected plants",
            "Contaminated tools",
            "Infected planting material"
        ],

        prevention: [
            "Use healthy planting material.",
            "Clean tools regularly.",
            "Avoid handling healthy plants immediately after infected plants.",
            "Remove infected plants according to local recommendations."
        ],

        management: [
            "Isolate suspicious plants where practical.",
            "Remove infected plant material according to local guidance.",
            "Disinfect tools and hands.",
            "Use certified healthy planting material."
        ]
    },


    Tomato__Tomato_YellowLeaf__Curl_Virus: {
        plant: "Tomato",
        disease: "Tomato Yellow Leaf Curl Virus",
        type: "Viral Disease",
        category: "Disease",
        severity: "High",
        cause: "Tomato yellow leaf curl virus",

        description:
            "Tomato yellow leaf curl virus can severely affect tomato growth. It is commonly associated with whitefly transmission and can cause leaf curling and yellowing.",

        symptoms: [
            "Leaves may curl upward.",
            "Young leaves may become yellow.",
            "Plants may show reduced growth.",
            "Leaf size can become smaller.",
            "Fruit production may be reduced."
        ],

        affectedParts: [
            "Leaves",
            "Young shoots",
            "Entire plant"
        ],

        favorableConditions: [
            "Presence of whitefly vectors",
            "Warm weather",
            "High vector activity"
        ],

        riskFactors: [
            "Whitefly infestation",
            "Infected plants",
            "Poor vector management",
            "Infected planting material"
        ],

        prevention: [
            "Monitor for whiteflies.",
            "Use healthy planting material.",
            "Remove infected plants according to local recommendations.",
            "Use appropriate vector-management practices."
        ],

        management: [
            "Monitor plants and whitefly populations.",
            "Remove severely affected plants according to local guidance.",
            "Manage insect vectors using integrated pest-management practices.",
            "Consult local agricultural experts for severe outbreaks."
        ]
    }

};

export default diseaseData;