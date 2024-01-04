import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { ParentProps, Show } from 'solid-js'
import { Project } from '../../types/Project'
import { UsageStatsChart } from './UsageStatsChart'

interface ProjectCardProps extends ParentProps {
    project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const openPage = (url: string | undefined) => {
        if (!url) return
        window.open(url, '_self')
    }

    return (
        <div class="card">
            <Show when={project.has_usage_stats && project.slug}>
                <div class="card__project-usage-stats">
                    <UsageStatsChart slug={project.slug} />
                </div>
            </Show>
            <div class="card__title">{project.title}</div>
            <Show when={project.description}>
                <div class="card__description">{project.description}</div>
            </Show>
            <div class="card__footer">
                <Show when={project.source_url}>
                    <a href={project.source_url} target="_blank">
                        <Fa icon={faGithub} /> Source Code
                    </a>
                </Show>
                <Show when={project.tg_url}>
                    <button
                        class="open-tg-bot-btn"
                        onClick={() => openPage(project.tg_url)}
                    >
                        <Fa icon={faTelegram} />
                    </button>
                </Show>
                <Show when={project.web_url}>
                    <button
                        class="open-project-btn"
                        onClick={() => openPage(project.web_url)}
                    >
                        <Fa icon={faArrowUpRightFromSquare} /> Open
                    </button>
                </Show>
            </div>
        </div>
    )
}
