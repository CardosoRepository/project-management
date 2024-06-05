import { useState } from "react";
import { NewProject } from "./components/Project/NewProject";
import { Sidebar } from "./components/Sidebar";
import { NoProjectSelected } from "./components/project/NoProjectSelected";
import uuidv4 from "node-uuid";
import { ProjectDetails } from "./components/project/ProjectDetails";

export function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [
            {
                id: "b89d11db-ef26-4af7-aef1-6764b0cef6f4",
                title: "Desenvolvimento de Aplicativo de Gerenciamento de Tarefas",
                description:
                    "Um aplicativo para ajudar equipes a gerenciar suas tarefas de forma eficiente.",
                dueDate: "2024-07-15",
            },
            {
                id: "2131231231231",
                title: "Redesign do Website Corporativo",
                description:
                    "Atualização do design e funcionalidades do site corporativo para melhorar a experiência do usuário.",
                dueDate: "2024-06-30",
            },
        ],
        tasks: [
            {
                id: "9c5b4807-c711-43cc-b9ff-fa43a38ac113",
                projectId: "b89d11db-ef26-4af7-aef1-6764b0cef6f4",
                text: "Conduzir pesquisa de mercado para identificar necessidades dos usuários",
            },
            {
                id: "123123123",
                projectId: "b89d11db-ef26-4af7-aef1-6764b0cef6f4",
                text: "Desenvolver protótipo de interface do usuário",
            },
            {
                id: "456456456",
                projectId: "2131231231231",
                text: "Realizar análise de usabilidade do site atual",
            },
            {
                id: "789789789",
                projectId: "2131231231231",
                text: "Criar wireframes para o novo design do site",
            },
        ],
    });

    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
    );

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    }

    function handleAddProject(projectData) {
        setProjectsState((prevState) => {
            const projectId = uuidv4();
            const newProject = {
                ...projectData,
                id: projectId,
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            };
        });
    }

    function handleCancel() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
    }

    function handleSelectProject(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
    }

    function handleDeleteProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                ),
            };
        });
    }

    function handleAddTask(text) {
        setProjectsState((prevState) => {
            const taskId = uuidv4();
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId,
                id: taskId,
            };
            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask],
            };
        });
    }

    function handleDeleteTask(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id),
            };
        });
    }

    return (
        <main className="flex flex-col h-screen">
            <div className="my-8"></div>
            <div className="flex h-full gap-8">
                <Sidebar
                    onStartAddProject={handleStartAddProject}
                    projects={projectsState.projects}
                    onSelectProject={handleSelectProject}
                    selectedProjectId={projectsState.selectedProjectId}
                />

                {projectsState.selectedProjectId === null ? (
                    <NewProject
                        onAdd={handleAddProject}
                        onCancel={handleCancel}
                    />
                ) : projectsState.selectedProjectId === undefined ? (
                    <NoProjectSelected
                        onStartAddProject={handleStartAddProject}
                    />
                ) : (
                    <ProjectDetails
                        project={selectedProject}
                        onDelete={handleDeleteProject}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        tasks={projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId)}
                    />
                )}
            </div>
        </main>
    );
}
