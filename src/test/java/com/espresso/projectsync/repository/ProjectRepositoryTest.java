package com.espresso.projectsync.repository;

import com.espresso.projectsync.model.Project;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProjectRepositoryTest {


    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    @DisplayName("Must save a project and verify that the audit fields are filled in.")
    void whenSaveProject_thenAuditingFieldsAreSet() {

        // GIVEN
        Project newProject = new Project();
        newProject.setName("Project Phoenix");
        newProject.setStatus("Active");
        newProject.setDescription("Internal tool development");
        newProject.setResponsiblePerson("A. Ruiz");

        // WHEN
        Project savedProject = projectRepository.save(newProject);

        entityManager.flush();
        entityManager.clear();

        // THEN
        Project foundProject = entityManager.find(Project.class, savedProject.getId());

        assertThat(foundProject).isNotNull();
        assertThat(foundProject.getCreatedAt()).isNotNull();
        assertThat(foundProject.getUpdatedAt()).isNotNull();
    }

    @Test
        @DisplayName("Must save and then find a project by ID")
    void whenSaveAndFindById_thenProjectIsFound() {

        // GIVEN
        Project newProject = new Project();
        newProject.setName("Project Atlas");
        newProject.setStatus("Pending");

                projectRepository.save(newProject);

        // WHEN
        Project foundProject = projectRepository.findById(newProject.getId()).orElse(null);

        // THEN
        assertThat(foundProject).isNotNull();
        assertThat(foundProject.getName()).isEqualTo("Project Atlas");
        assertThat(foundProject.getStatus()).isEqualTo("Pending");
    }
}
