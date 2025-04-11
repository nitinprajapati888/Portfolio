document.addEventListener('DOMContentLoaded', () => {

    // --- Helper: Safely Get Element by ID ---
    function getElement(id, description = 'Element') {
        const element = document.getElementById(id);
        if (!element) {
            // Log a warning instead of an error to avoid breaking other scripts if element is optional
            console.warn(`${description} with ID '${id}' not found. Check your HTML.`);
        }
        return element;
    }

    // --- Sidebar Functionality ---
    const sidebar = getElement('sidebar', 'Sidebar Navigation');
    const sidebarToggle = getElement('sidebar-toggle', 'Sidebar Toggle Button');
    const sidebarLinks = sidebar ? sidebar.querySelectorAll('.nav-link') : []; // Get all links within the sidebar

    let sidebarCollapseInstance = null;

    // Check if Bootstrap's Collapse component is available and the sidebar element exists
    if (sidebar && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        // Initialize Bootstrap Collapse, but don't toggle it automatically on init
        sidebarCollapseInstance = new bootstrap.Collapse(sidebar, { toggle: false });
    } else if (sidebar && (typeof bootstrap === 'undefined' || !bootstrap.Collapse)) {
        // Log if Bootstrap Collapse isn't found, as toggle might rely on it
        console.warn('Bootstrap Collapse component not found or not loaded. Sidebar toggle might require manual class handling or Bootstrap JS.');
    }

    // Function to explicitly close the sidebar (useful on smaller screens)
    const closeSidebar = () => {
        // Only attempt to close if it's likely an overlay (screen < 992px),
        // the sidebar exists, it's currently shown, and we have the Bootstrap instance
        if (window.innerWidth < 992 && sidebar && sidebar.classList.contains('show') && sidebarCollapseInstance) {
            sidebarCollapseInstance.hide();
            // The 'hide.bs.collapse' event listener below will handle removing the body class
        }
    };

    // --- Event Listeners ---

    // 1. Toggle sidebar on button click
    if (sidebarToggle && sidebarCollapseInstance) {
        sidebarToggle.addEventListener('click', () => {
            // Use Bootstrap's toggle method
            sidebarCollapseInstance.toggle();
        });
    } else if (sidebarToggle && !sidebarCollapseInstance) {
        // Fallback: If Bootstrap JS isn't used, you might toggle a custom class
        // sidebarToggle.addEventListener('click', () => {
        //    sidebar.classList.toggle('is-active'); // Example custom class
        //    document.body.classList.toggle('sidebar-open'); // Toggle overlay class manually
        // });
        console.warn('Sidebar toggle button found, but Bootstrap Collapse instance is missing. Toggle might not work.');
    }

    // 2. Add/Remove body class when sidebar is shown/hidden (for overlay effect on small screens)
    if (sidebar) {
        sidebar.addEventListener('show.bs.collapse', () => {
            // Add overlay class only on smaller viewports
            if (window.innerWidth < 992) {
                document.body.classList.add('sidebar-open');
            }
        });

        sidebar.addEventListener('hide.bs.collapse', () => {
            // Always remove the overlay class when sidebar hides
            document.body.classList.remove('sidebar-open');
        });
    }

    // 3. Close sidebar when clicking an internal link inside it (on small screens)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if it's an internal hash link (starts with #)
            if (link.getAttribute('href')?.startsWith('#')) {
                // Close the sidebar after a short delay to allow navigation/scroll to start
                setTimeout(closeSidebar, 150);
            }
            // External links or non-hash links won't automatically close the sidebar
        });
    });

    // 4. Close sidebar when clicking outside of it (on small screens)
    document.addEventListener('click', (event) => {
        // Check if the sidebar exists, is currently shown, and screen is small
        if (window.innerWidth < 992 && sidebar && sidebar.classList.contains('show')) {
            // Check if the click target is outside the sidebar AND outside the toggle button
            const isClickInsideSidebar = sidebar.contains(event.target);
            // Ensure sidebarToggle exists before checking contains
            const isClickOnToggler = sidebarToggle ? sidebarToggle.contains(event.target) : false;

            if (!isClickInsideSidebar && !isClickOnToggler) {
                closeSidebar();
            }
        }
    });
    // --- End Sidebar Functionality ---
});

// Load introduction
fetch('data/introduction.json')
  .then(response => response.json())
  .then(introduction => {
    document.getElementById('introduction-text').textContent = introduction.introduction;
  });

fetch('data/certificates.json')
  .then(response => response.json())
  .then(certificates => {
    const certificateList = document.getElementById('certificate-list'); // Assuming you have an element with this ID
    certificates.forEach(certificate => {
      const box = document.createElement('div');
      box.className = 'box'; // Add a class for styling

      box.innerHTML = `
        <h3>${certificate.name}</h3>
        <p>Organization: ${certificate.organization}</p>
        <p>Date: ${certificate.date}</p>
        <a href="${certificate.pdf}" target="_blank" class="pdf-link">View PDF</a>
      `;
      certificateList.appendChild(box);
    });
  })
  .catch(error => {
    console.error('Error fetching or processing certificates:', error);
  });


// Load projects
fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const projectList = document.getElementById('project-list');
        projects.forEach(project => {
            const box = document.createElement('div');
            box.className = 'box';
            box.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p>Technologies: ${project.technologies.join(', ')}</p>
                <a href="${project.link}" class="view-link" target="_blank">View Project</a>
            `;
            projectList.appendChild(box);
        });
    });

// Load GitHub repositories
function fetchGitHubRepos() {
    const githubUsername = 'nitinprajapati888';
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
        .then(response => response.json())
        .then(repos => {
            const githubReposDiv = document.getElementById('github-repos');
            repos.forEach(repo => {
                const box = document.createElement('div');
                box.className = 'box';
                box.innerHTML = `
                    <img src="${repo.owner.avatar_url}" alt="${repo.name} image">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <a href="${repo.html_url}" class="view-link" target="_blank">View on GitHub</a>
                `;
                githubReposDiv.appendChild(box);
            });
        });
}

fetch('data/skills.json')
  .then(response => response.json())
  .then(skillCategories => {
    const skillsContainer = document.getElementById('skills-container'); // Assuming you have a container for all skills

    skillCategories.forEach(category => {
      // Create category heading
      const categoryHeading = document.createElement('h3');
      categoryHeading.textContent = category.category;
      skillsContainer.appendChild(categoryHeading);

      // Create a list for the skills in this category
      const skillsList = document.createElement('ul');
      skillsList.className = 'skills-list'; // Add a class for styling
      skillsContainer.appendChild(skillsList);

      // Add each skill to the list
      category.skills.forEach(skillObj => {
        const skillElement = document.createElement('li');
        skillElement.textContent = skillObj.skill;

        // Create the icon element
        const iconElement = document.createElement('i');
        iconElement.className = skillObj.icon;

        // Insert the icon before the text
        skillElement.prepend(iconElement);

        skillsList.appendChild(skillElement);
      });
    });
  })
  .catch(error => {
    console.error('Error fetching or processing skills:', error);
  });
//contact form, this portion will be expanded later.
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get form values (optional, if you want to use them for validation)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation (you can add more complex validation here)
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Submit the form using fetch (Formspree will handle the submission)
    fetch(event.target.action, {
        method: 'POST',
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            document.getElementById('contact-form').reset();
        } else {
            alert('There was a problem sending your message.');
        }
    }).catch(error => {
        alert('There was a problem sending your message.');
    });
});

// Smooth Scrolling and Active Link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ... (existing JavaScript) ...
