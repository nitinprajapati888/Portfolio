// Load introduction
fetch('data/introduction.json')
  .then(response => response.json())
  .then(introduction => {
    document.getElementById('introduction-text').textContent = introduction.introduction;
  });
// Load certificates
fetch('data/certificates.json')
    .then(response => response.json())
    .then(certificates => {
        const certificateList = document.getElementById('certificate-list');
        certificates.forEach(certificate => {
            const box = document.createElement('div');
            box.className = 'box';
            box.innerHTML = `
                <img src="assets/certificate-placeholder.jpg" alt="${certificate.name} image">
                <h3>${certificate.name}</h3>
                <p>Organization: ${certificate.organization}</p>
                <p>Date: ${certificate.date}</p>
                <a href="#" class="view-link">View Certificate</a>
            `;
            certificateList.appendChild(box);
        });
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
                <img src="assets/project-placeholder.jpg" alt="${project.title} image">
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

// Load skills
fetch('data/skills.json')
  .then(response => response.json())
  .then(skills => {
    const skillList = document.getElementById('skill-list');
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = "skill-bar";
        skillElement.textContent = skill.skill;
        skillList.appendChild(skillElement);
    });
  });
//contact form, this portion will be expanded later.
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("contact form submission, this functionality will be added later");
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

// Navbar Toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarNav = document.getElementById('sidebar-nav');

sidebarToggle.addEventListener('click', () => {
    sidebarNav.classList.toggle('show');
});