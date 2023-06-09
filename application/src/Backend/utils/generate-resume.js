import axios from 'axios';
require('dotenv').config({path:"../../../.env"});
const generateResume = async (inputData) => {
  // Define the request headers
  const headers = {
    'Content-Type': 'application/json',

    'Authorization': `Bearer ${process.env.OPENAI}`,
  };

  // Define the request body with the dynamic prompt based on form data
  const jobEntries = inputData.jobExperience.map((job) => {
    return `${job.title} at ${job.company} (${job.startDate} - ${job.endDate}), description: ${job.tasks}`;
  }).join(", ");

  const data = {
    model: 'text-davinci-003',
    prompt: `Given the following information, create a Harvard Style resume that maximizes the appeal toward this field of jobs: ${inputData.careerInterest}:
    Name: ${inputData.name},
    Email: ${inputData.email},
    Phone Number: ${inputData.phoneNumber},
    Education: ${inputData.education},
    Experience: ${jobEntries},
    Skills: ${inputData.skills},
    

Use the following template and follow the directions within the []:

[Name]
[Address] • [Email] • [Phone]
[Write an Objective Statement]

Education
[Education]

Experience
[based on the information provided by the description for each job. Expound upond each section and add quantiative based results to maximize the appeal of the resume to employers]

Skills
Skills: [Skills]

Fill in the template with the provided information, ensuring a consistent format and maximizing the keywords which relate to ${inputData.careerInterest}.`,
    max_tokens: 2048,
    temperature: 0.9,
  };

  // Make the API call to generate the resume
  const response = await axios.post('https://api.openai.com/v1/completions', data, { headers: headers });
  const resume = response.data.choices[0].text.trim();

  return resume;
};

export {generateResume};
