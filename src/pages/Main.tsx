import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { Container } from '@suid/material'
import Fa from 'solid-fa'
import { Component, For, createSignal, onMount } from 'solid-js'
import logo from '../assets/logo.svg'
import { Card } from '../components/UI/Card'
import { Project } from '../types/Project'

export const MainPage: Component = () => {
    const [projects, setProjects] = createSignal<Project[]>([])

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
                    <a href="/" class="selected">
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
                    {(project: Project) => <Card project={project} />}
                </For>
            </div>
        </Container>
    )
}
