import reflect from '../lib/reflect'
import applyDefaultProps from '../lib/applyDefaultProps'
import styles from './chaoticOrbit.scss'

const template = document.createElement('template')

class ChaoticOrbit extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'color', 'speed']
  }

  constructor() {
    super()
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: 'open' })
    }
    reflect(this, ['size', 'color', 'speed'])
  }

  connectedCallback() {
    applyDefaultProps(this, {
      size: 35,
      color: 'black',
      speed: 1.5,
    })

    template.innerHTML = `
      <div class="container"></div>
      <style>
        :host{
          --uib-size: ${this.size}px;
          --uib-color: ${this.color};
          --uib-speed: ${this.speed}s;
        }
        ${styles}
      </style>
    `

    this.shadow.replaceChildren(template.content.cloneNode(true))

    this.dispatchEvent(new Event('ready'))
  }

  attributeChangedCallback() {
    const styleEl = this.shadow.querySelector('style')

    if (!styleEl) return

    styleEl.innerHTML = `
      :host{
        --uib-size: ${this.size}px;
        --uib-color: ${this.color};
        --uib-speed: ${this.speed}s;
      }
      ${styles}
    `
  }
}

export default {
  register: (name = 'l-chaotic-orbit') => {
    if (!customElements.get(name)) {
      customElements.define(name, class extends ChaoticOrbit {})
    }
  },
  element: ChaoticOrbit,
}