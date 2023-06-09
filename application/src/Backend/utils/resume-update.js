import axios from 'axios';
require('dotenv').config({path:"../../../.env"});
const updateResume = async (inputData) => {
    // Define the request headers
    const headers = {
        'Content-Type': 'application/json',

        'Authorization': `Bearer ${process.env.OPENAI}`,
    };

    // Define the request body with the dynamic prompt based on form data
    const data = {
        model: 'text-davinci-003',
        prompt: `Given the following resume, please apply the requested changes:

                Resume:
                ${inputData.resume}

                Requested changes:
                ${inputData.changes}

                Update the resume with the requested changes and ensure it remains coherent and well-structured.`,
        max_tokens: 1024,
        temperature: 0.9,
    };

    // Make the API call to update the resume
    const response = await axios.post('https://api.openai.com/v1/completions', data, { headers: headers });
    const updatedResume = response.data.choices[0].text.trim();

    return updatedResume;
};

export {updateResume};
