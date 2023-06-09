import { useState } from "react";
import { jsPDF } from "jspdf";
import "./resume-form.css";
import {generateResume} from "../../Backend/utils/generate-resume.js";

function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    jobExperience: [],
    education: "",
    careerInterest: "",
    skills: "",
  });
  const [resume, setResume] = useState("");

  const handleJobChange = (event, index) => {
    const { name, value } = event.target;
    const jobExperience = [...formData.jobExperience];
    jobExperience[index][name] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      jobExperience,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await generateResume(formData);
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const marginLeft = 10;
    const marginRight = 10;
    const marginTop = 10;
    const marginBottom = 10;
    const maxWidth = pageWidth - marginLeft - marginRight;
    const lineHeight = 7; // Adjust this value based on the desired line spacing

    const wrappedText = pdf.splitTextToSize(response, maxWidth);
    const linesPerPage = Math.floor((pageHeight - marginTop - marginBottom) / lineHeight);

    // eslint-disable-next-line
    let currentPage = 0;
    let currentLine = 0;

    wrappedText.forEach((line) => {
      if (currentLine >= linesPerPage) {
        pdf.addPage();
        currentPage += 1;
        currentLine = 0;
      }

      pdf.text(line, marginLeft, marginTop + currentLine * lineHeight);
      currentLine += 1;
    });

    const pdfData = pdf.output("datauristring");
    setResume(pdfData);
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddJob = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      jobExperience: [
        ...prevFormData.jobExperience,
        {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          tasks: "",
        },
      ],
    }));
  };

  const handleRemoveJob = (index) => {
    const jobExperience = [...formData.jobExperience];
    jobExperience.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      jobExperience,
    }));
  };

  const jobEntries = formData.jobExperience.map((job, jobIndex) => {
    return (
      <div key={jobIndex}>
        <label>
          Job/Experience Title:
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={(event) => handleJobChange(event, jobIndex)}
            size="40"
            required
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={(event) => handleJobChange(event, jobIndex)}
            size="40"
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="text"
            name="startDate"
            value={job.startDate}
            onChange={(event) => handleJobChange(event, jobIndex)}
            size="40"
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="text"
            name="endDate"
            value={job.endDate}
            onChange={(event) => handleJobChange(event, jobIndex)}
            size="40"
            required
          />
        </label>
        <label>
          Tasks:
          <textarea
            name="tasks"
            value={job.tasks}
            onChange={(event) => handleJobChange(event, jobIndex)}
            size="40"
            required
          />
        </label>
        <button type="button" className="remove-job-button" onClick={() => handleRemoveJob(jobIndex)}>
          Remove Job
        </button>
      </div>
    );
  });


  return (
    <div>
      <form onSubmit={handleSubmit} className="resume-form">
        <h2>Build Your Resume</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="40"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            size="40"
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            size="40"
            required
          />
        </label>
        <label>
          Education:
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            size="40"
            required
          />
        </label>
        <label>
          Career Interest:
          <input
            type="text"
            name="careerInterest"
            value={formData.careerInterest}
            onChange={handleChange}
            size="40"
            required
          />
        </label>
        <label>
          Skills:
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows="4"
            cols="38.9"
            required
          />
        </label>

        {jobEntries}
        <button type="button" className="add-job-button" onClick={handleAddJob}>
          Add Job
        </button>
        <br />
        <br />
        <button type="submit">Generate Resume</button>
      </form>
      {resume && (
        <div >
          <h2>Generated Resume</h2>
          <object
            data={resume}
            type="application/pdf"
            width="100%"
            height="600px"
            className="pdf-viewer"
          >
            <p>
              It appears your browser does not support embedded PDFs.
              <a href={resume} download="resume.pdf">Click here to download the resume</a>
            </p>
          </object>
        </div>
      )}

    </div>
  );
}

export {ResumeForm};