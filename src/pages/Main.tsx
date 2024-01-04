import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { Container, Skeleton } from '@suid/material'
import Fa from 'solid-fa'
import { Component, For, createSignal, onCleanup, onMount } from 'solid-js'
import logo from '../assets/logo.svg'
import { Card } from '../components/UI/Card'
import { getProjectsList } from '../services/projects.service'
import { Project } from '../types/Project'

export const MainPage: Component = () => {
    const [projects, setProjects] = createSignal<Project[]>([])
    const [loading, setLoading] = createSignal(true)
    const [error, setError] = createSignal<string | null>(null)

    onMount(async () => {
        try {
            const response = await getProjectsList()
            setProjects(response?.result || [])
        } catch (err: any) {
            setError(
                `Failed to fetch projects.${
                    err.message ? ` Error message: "${err.message}".` : ''
                } Please try again.`
            )
        } finally {
            setLoading(false)
        }
    })

    onCleanup(() => setLoading(false))

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
                {loading() ? (
                    <For each={[1, 2, 3]}>
                        {() => (
                            <Skeleton
                                sx={{
                                    borderRadius: '8px',
                                    backgroundColor: '#0d2e365c',
                                    margin: '10px',
                                }}
                                class="card__skeleton"
                                variant="rectangular"
                                height="200px"
                                width="100%"
                            />
                        )}
                    </For>
                ) : error() ? (
                    <div class="error-message">Error: {error()}</div>
                ) : (
                    <For each={projects()}>
                        {(project: Project) => <Card project={project} />}
                    </For>
                )}
            </div>
        </Container>
    )
}
