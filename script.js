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
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${certificate.name}</h3>
        <p>Organization: ${certificate.organization}</p>
        <p>Date: ${certificate.date}</p>
      `;
      certificateList.appendChild(card);
    });
  });

// Load projects
fetch('data/projects.json')
  .then(response => response.json())
  .then(projects => {
    const projectList = document.getElementById('project-list');
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p>Technologies: ${project.technologies.join(', ')}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;
      projectList.appendChild(card);
    });
  });

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
// ... (other parts of your script.js) ...
function fetchGitHubRepos() {
    const githubUsername = 'yourusername';
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
        .then(response => response.json())
        .then(repos => {
            const githubReposDiv = document.getElementById('github-repos');
            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'card project-card'; // Added project-card class
                card.style.width = '18rem';

                card.innerHTML = `
                    <img src="${repo.owner.avatar_url}" class="card-img-top" alt="${repo.name} image">
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description || 'No description'}</p>
                        <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
                    </div>
                    <div class="project-details">
                        <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
                        <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                        <p><strong>Forks:</strong> ${repo.forks_count}</p>
                    </div>
                `;
                githubReposDiv.appendChild(card);
            });
        });
}
//contact form, this portion will be expanded later.
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("contact form submission, this functionality will be added later");
});