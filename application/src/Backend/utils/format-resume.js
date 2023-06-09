function formatResume(text) {
    // Split the text into lines
    const lines = text.split('\n');
  
    // Define section labels
    const sections = ['Name', 'Contact Information', 'Education', 'Experience', 'Skills'];
  
    // Initialize an array to store the formatted lines
    const formattedLines = [];
  
    // Loop through the lines and apply the formatting rules
    lines.forEach((line) => {
      // Check if the line is a section label
      if (sections.includes(line)) {
        // Apply formatting for section labels
        formattedLines.push({ text: line, style: 'sectionLabel' });
      } else {
        // Check if the line is part of the Education, Experience, or Skills sections
        const isPartOfSection = sections.slice(2).some((section) => line.startsWith(section));
  
        if (isPartOfSection) {
          // Apply formatting for institution/company name, position title, or skill category
          formattedLines.push({ text: line, style: 'bold' });
        } else {
          // Apply default formatting for other lines
          formattedLines.push({ text: line, style: 'regular' });
        }
      }
    });
  
    return formattedLines;
  }
  
  export {formatResume};