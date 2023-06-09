import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import {updateResume} from '../../Backend/utils/resume-update.js';
import {formatResume} from '../../Backend/utils/format-resume.js';
import { useLocation } from 'react-router-dom';
import "./resume-update.css"
const ResumeUpdateForm = () => {
    const [changes, setChanges] = useState('');
    const [resume, setResume] = useState('');
    const [updatedResume, setUpdatedResume] = useState('');
    const location = useLocation();
    const comment = location.state?.comment ?? '';
    useEffect(() => {
        if (comment) {
            setChanges(
                `Tailor the resume so that it appeals to this job description: ${comment}`
            );
        }
    }, [comment]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call OpenAI API to update the resume
        const response = await updateResume({ resume, changes });
        const formattedText = formatResume(response);


        const pdf = new jsPDF();
        formattedText.forEach((line) => {
            // Apply the appropriate styling based on the line's style property
            if (line.style === 'sectionLabel') {
                pdf.setFontSize(14);
                pdf.setFont(undefined, 'bold');
            } else if (line.style === 'bold') {
                pdf.setFontSize(12);
                pdf.setFont(undefined, 'bold');
            } else {
                pdf.setFontSize(12);
                pdf.setFont(undefined, 'normal');
            }
        });


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

        const pdfData = pdf.output('datauristring');
        setUpdatedResume(pdfData);
    };

    return (
        <div className="update-form">
            <h1>Update Your Resume</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="changes">What changes would you like to make to your resume?</label>
                    <textarea
                        id="changes"
                        name="changes"
                        value={changes}
                        onChange={(e) => setChanges(e.target.value)}
                        rows="5"
                        cols="50"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="resume">Paste your resume here:</label>
                    <textarea
                        id="resume"
                        name="resume"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                        rows="10"
                        cols="50"
                        required
                    />
                </div>
                <button type="submit">Update Resume</button>
            </form>
            {updatedResume && (
                <div className="updated-resume">
                    <h2>Updated Resume</h2>
                    <object
                        data={updatedResume}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                        className="pdf-viewer"
                    >
                        <p>
                            It appears your browser does not support embedded PDFs.
                            <a href={updatedResume} download="updated_resume.pdf">Click here to download the updated resume</a>
                        </p>
                    </object>
                    <a href={updatedResume} download="updated_resume.pdf" className="download-link">
                        Download Updated Resume
                    </a>
                </div>
            )}
        </div>
    );
};

export {ResumeUpdateForm};
