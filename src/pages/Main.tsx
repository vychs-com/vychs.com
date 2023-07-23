import type { Component } from 'solid-js'
import { Typography } from '@suid/material'
import logo from '../assets/logo.svg'

import styles from '../styles/App.module.css'
import { createSignal, onCleanup, onMount, Show } from 'solid-js'

const REDIRECT_TIMEOUT = 3_000
const WARNING_MESSAGE_TIMEOUT = 5_000

const MainPage: Component = () => {
    const [redirectTimeout, setRedirectTimeout] = createSignal<number>(
        REDIRECT_TIMEOUT / 1_000
    )
    const [showWarningMessage, setShowWarningMessage] =
        createSignal<boolean>(false)

    onMount(() => {
        const intervalId = setInterval(() => {
            setRedirectTimeout(prevTimeout => {
                const newTimeout = prevTimeout - 1

                if (newTimeout <= 0) {
                    clearInterval(intervalId)
                    window.location.href = 'https://vychs.t.me/'
                }

                return newTimeout
            })
        }, 1_000)

        const timeoutId = setTimeout(() => {
            setShowWarningMessage(true)
        }, WARNING_MESSAGE_TIMEOUT)

        onCleanup(() => {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
        })
    })

    return (
        <div class={styles.App}>
            <header class={styles.header}>
                <img src={logo} class={styles.logo} alt="logo" />
                <Show
                    when={!showWarningMessage()}
                    fallback={
                        <Typography variant="h3" gutterBottom component="div">
                            If you haven't been redirected yet,{' '}
                            <a
                                class={styles.link}
                                href="https://vychs.t.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                click here
                            </a>
                        </Typography>
                    }
                >
                    <Typography variant="h3" gutterBottom component="div">
                        You will be redirected in{' '}
                        <code>{redirectTimeout()}</code>
                    </Typography>
                </Show>
                <Typography variant="caption" sx={{ display: 'block' }}>
                    This is the initial version of the website. Soon there will
                    be something in here.
                </Typography>
            </header>
        </div>
    )
}

export default MainPage
