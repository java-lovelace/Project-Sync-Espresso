// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Get references to the main elements in the HTML
    const projectTableBody = document.getElementById('project-table-body');
    const projectForm = document.getElementById('project-form');
    const projectModal = document.getElementById('project-modal');
    const addProjectBtn = document.getElementById('add-project-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const modalTitle = document.getElementById('modal-title');
    const viewProjectModal = document.getElementById('view-project-modal');
    const viewProjectDetails = document.getElementById('view-project-details');
    const viewCloseBtn = document.getElementById('view-close-btn');

    // A variable to keep track of the project ID we are currently editing.
    // If it's null, we are in "create" mode. If it has an ID, we are in "edit" mode.
    let editingProjectId = null;

    /**
     * Toggles the visibility of the form modal.
     * @param {boolean} show - Whether to show or hide the modal.
     */
    function toggleFormModal(show) {
        projectModal.classList.toggle('hidden', !show);
    }

    /**
     * Toggles the visibility of the view modal.
     * @param {boolean} show - Whether to show or hide the modal.
     */
    function toggleViewModal(show) {
        viewProjectModal.classList.toggle('hidden', !show);
    }

    /**
     * Fetches all projects from the backend API and populates the project table.
     * This function implements the "Read" part of the CRUD.
     */
    function fetchProjects() {
        fetch('/api/projects')
            .then(response => response.json())
            .then(projects => {
                // Clear the table body to avoid duplicating rows on refresh
                projectTableBody.innerHTML = '';

                // Iterate over each project and create a new table row
                projects.forEach(project => {
                    const row = document.createElement('tr');
                    // Populate the row with project data
                    row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${project.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs overflow-hidden text-ellipsis">${project.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${project.status}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-sm overflow-hidden text-ellipsis">${project.description}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${project.responsiblePerson}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" class="text-gray-600 hover:text-gray-900 view-btn" data-id="${project.id}">View</a>
                            <a href="#" class="text-indigo-600 hover:text-indigo-900 ml-4 edit-btn" data-id="${project.id}">Edit</a>
                            <a href="#" class="text-red-600 hover:text-red-900 ml-4 delete-btn" data-id="${project.id}">Delete</a>
                        </td>
                    `;
                    projectTableBody.appendChild(row);
                });

                // After creating the rows, add event listeners to the new buttons
                addEventListeners();
            });
    }

    /**
     * Adds click event listeners to all "View", "Edit", and "Delete" buttons in the table.
     */
    function addEventListeners() {
        // Add listeners for all delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default anchor tag behavior
                const projectId = this.getAttribute('data-id');

                // Show a confirmation dialog before deleting
                if (confirm('Are you sure you want to delete this project?')) {
                    // Send a DELETE request to the backend
                    fetch(`/api/projects/${projectId}`, {
                        method: 'DELETE'
                    })
                    .then(() => fetchProjects()); // Refresh the project list after deletion
                }
            });
        });

        // Add listeners for all edit buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default anchor tag behavior
                const projectId = this.getAttribute('data-id');
                editingProjectId = projectId; // Set the app to "edit mode"
                modalTitle.textContent = 'Edit Project';

                // Fetch the data for the selected project
                fetch(`/api/projects/${projectId}`)
                    .then(response => response.json())
                    .then(project => {
                        // Populate the form with the project's data
                        projectForm.name.value = project.name;
                        projectForm.status.value = project.status;
                        projectForm.description.value = project.description;
                        projectForm.responsiblePerson.value = project.responsiblePerson;
                        toggleFormModal(true); // Show the modal
                    });
            });
        });

        // Add listeners for all view buttons
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default anchor tag behavior
                const projectId = this.getAttribute('data-id');

                // Fetch the data for the selected project
                fetch(`/api/projects/${projectId}`)
                    .then(response => response.json())
                    .then(project => {
                        // Populate the view modal with the project's data
                        viewProjectDetails.innerHTML = `
                            <p><strong>ID:</strong> ${project.id}</p>
                            <p><strong>Name:</strong> ${project.name}</p>
                            <p><strong>Status:</strong> ${project.status}</p>
                            <p><strong>Description:</strong> ${project.description}</p>
                            <p><strong>Responsible Person:</strong> ${project.responsiblePerson}</p>
                        `;
                        toggleViewModal(true); // Show the modal
                    });
            });
        });
    }

    // Event listener for the "Add Project" button
    addProjectBtn.addEventListener('click', function() {
        editingProjectId = null; // Ensure we are in "create mode"
        modalTitle.textContent = 'Add New Project';
        projectForm.reset(); // Clear the form
        toggleFormModal(true); // Show the modal
    });

    // Event listener for the "Cancel" button in the form modal
    cancelBtn.addEventListener('click', function() {
        toggleFormModal(false); // Hide the modal
    });

    // Event listener for the "Close" button in the view modal
    viewCloseBtn.addEventListener('click', function() {
        toggleViewModal(false); // Hide the modal
    });

    /**
     * Handles the form submission for both creating and updating projects.
     */
    projectForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission which reloads the page

        // Collect the data from the form
        const formData = new FormData(projectForm);
        const projectData = {
            name: formData.get('name'),
            status: formData.get('status'),
            description: formData.get('description'),
            responsiblePerson: formData.get('responsiblePerson')
        };

        // Determine the HTTP method and URL based on whether we are editing or creating
        const method = editingProjectId ? 'PUT' : 'POST';
        const url = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects';

        // Send the data to the backend
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        })
        .then(response => response.json())
        .then(() => {
            toggleFormModal(false); // Hide the modal
            fetchProjects(); // Refresh the project list
        });
    });

    // Initial call to fetch and display projects when the page loads
    fetchProjects();
});