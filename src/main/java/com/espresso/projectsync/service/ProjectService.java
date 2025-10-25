package com.espresso.projectsync.service;

import com.espresso.projectsync.model.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    Project createProject(Project project);
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    Project updateProject(Long id, Project projectDetails);
    void deleteProject(Long id);
}
