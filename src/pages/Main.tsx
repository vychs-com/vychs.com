import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Container } from '@suid/material'
import Fa from 'solid-fa'
import { Component, For, Show, createSignal, onMount } from 'solid-js'
import logo from '../assets/logo.svg'
import { Project } from '../types/Project'

export const MainPage: Component = () => {
    const [projects, setProjects] = createSignal<Project[]>([])

    const openPage = (url: string | undefined) => {
        if (!url) return
        window.open(url, '_self')
    }

    onMount(() => {
        setProjects([
            {
                title: 'Random Animals',
                description:
                    'Create dynamic random animal pictures using Telegram icons from various platforms. Explore customization options to tailor the generated images to your preferences and easily download the pictures for your enjoyment. Web version.',
                web_url: 'https://animals.vychs.com',
                tg_url: 'https://t.me/randanimalbot',
                source_url: 'https://github.com/vychs-com/animals.vychs.com',
            },
            {
                title: 'SolidJs Chart.js',
                description:
                    'Developed with SolidJs, this package offers seamlessly integrated components for Chart.js. Explore the demo webpage showcasing multiple components from the package, accompanied by manipulation buttons that allow you to see the dynamic nature of the charts in real-time.',
                web_url: 'https://solid-chartjs.vychs.com/',
                source_url: 'https://github.com/s0ftik3/solid-chartjs',
            },
        ])
    })

    return (
        <Container maxWidth="sm">
            <div class="header">
                <div class="logotype">
                    <img src={logo} alt="logo" />
                </div>
                <div class="navigation">
                    <a href="#" class="selected">
                        vychs.com
                    </a>
                    {/*<a href='#' class="selected">Projects</a>*/}
                    {/*<a href='#' class="disabled">About</a>*/}
                    {/*<a href='#' class="disabled">API</a>*/}
                </div>
                <div class="icons">
                    <a href="https://t.me/vychs" target="_blank">
                        <Fa icon={faTelegram} />
                    </a>
                    <a
                        href="https://t.me/vhslaugh"
                        target="_blank"
                        style={{ 'margin-left': '10px' }}
                    >
                        <Fa icon={faTelegram} />
                    </a>
                    <a
                        href="https://github.com/s0ftik3"
                        target="_blank"
                        style={{ 'margin-left': '10px' }}
                    >
                        <Fa icon={faGithub} />
                    </a>
                </div>
            </div>
            <div class="content">
                <For each={projects()}>
                    {(project: Project) => (
                        <div class="card">
                            <div class="card__title">{project.title}</div>
                            <Show when={project.description}>
                                <div class="card__description">
                                    {project.description}
                                </div>
                            </Show>
                            <div class="card__footer">
                                <Show when={project.source_url}>
                                    <a
                                        href={project.source_url}
                                        target="_blank"
                                    >
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
                                        onClick={() =>
                                            openPage(project.web_url)
                                        }
                                    >
                                        <Fa icon={faArrowUpRightFromSquare} />{' '}
                                        Open
                                    </button>
                                </Show>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </Container>
    )
}
