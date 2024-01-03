import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { Container } from '@suid/material'
import Fa from 'solid-fa'
import type { Component } from 'solid-js'
import logo from '../assets/logo.svg'

export const MainPage: Component = () => {
    const openProjectPage = (subdomain: string) => {
        window.open('https://' + subdomain + '.vychs.com', '_self')
    }

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
                        href="https://github.com/s0ftik3"
                        target="_blank"
                        style={{ 'margin-left': '10px' }}
                    >
                        <Fa icon={faGithub} />
                    </a>
                </div>
            </div>
            <div class="content">
                <div class="card" onClick={() => openProjectPage('animals')}>
                    <div class="card__title">Random Animals</div>
                    <div class="card__description">
                        Create a dynamic random animal pictures using Telegram
                        icons from various platforms. Explore customization
                        options to tailor the generated images to your
                        preferences and easily download the pictures for your
                        enjoyment.
                    </div>
                </div>

                <div
                    class="card"
                    onClick={() => openProjectPage('solid-chartjs')}
                >
                    <div class="card__title">SolidJs Chart.js</div>
                    <div class="card__description">
                        SolidJs components for Chart.js. Demo webpage.
                    </div>
                </div>
            </div>
        </Container>
    )
}
