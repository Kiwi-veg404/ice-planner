/**
 * Copyright 2025 Junyu Zhao
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `app-button`
 * A reusable button component with different variants
 * 
 * @element app-button
 */
export class AppButton extends DDDSuper(LitElement) {

  static get tag() {
    return "app-button";
  }

  constructor() {
    super();
    this.variant = "primary";
    this.disabled = false;
    this.size = "medium";
    this.label = "";
  }

  static get properties() {
    return {
      ...super.properties,
      variant: { type: String },
      disabled: { type: Boolean },
      size: { type: String },
      label: { type: String }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
      }
      
      button {
        border: none;
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-family: var(--ddd-font-navigation);
        font-weight: bold;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ddd-spacing-1);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      /* Size variants */
      .small {
        padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-xs);
      }
      
      .medium {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        font-size: var(--ddd-font-size-s);
      }
      
      .large {
        padding: var(--ddd-spacing-3) var(--ddd-spacing-5);
        font-size: var(--ddd-font-size-m);
      }
      
      /* Primary variant */
      .primary {
        background-color: var(--ddd-theme-default-athertonViolet);
        color: var(--ddd-theme-default-white);
      }
      
      .primary:hover:focus:not(:disabled) {
        background-color: var(--ddd-theme-default-alertImmediate);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      /* Secondary variant */
      .secondary {
        background-color: var(--ddd-theme-accent);
        color: var(--ddd-theme-primary);
        border: 1px solid var(--ddd-theme-primary);
      }
      
      .secondary:hover:not(:disabled) {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-default-white);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      /* Outline variant */
      .outline {
        background-color: transparent;
        color: var(--ddd-theme-primary);
        border: 2px solid var(--ddd-theme-primary);
      }
      
      .outline:hover:not(:disabled) {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-default-white);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      /* Ghost variant */
      .ghost {
        background-color: transparent;
        color: var(--ddd-theme-primary);
        border: 1px solid transparent;
      }
      
      .ghost:hover:not(:disabled) {
        background-color: var(--ddd-theme-primary-light);
        border-color: var(--ddd-theme-primary);
      }

      @media (prefers-color-scheme: dark) {
        .secondary {
          background-color: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
          border-color: var(--ddd-theme-default-limestoneGray);
        }
        
        .outline {
          color: var(--ddd-theme-default-white);
          border-color: var(--ddd-theme-default-white);
        }
        
        .outline:hover:not(:disabled) {
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-coalyGray);
        }
        
        .ghost {
          color: var(--ddd-theme-default-white);
        }
        
        .ghost:hover:not(:disabled) {
          background-color: var(--ddd-theme-default-limestoneGray);
          border-color: var(--ddd-theme-default-white);
        }
      }
    `];
  }

  _handleClick(e) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('button-click', {
        detail: { originalEvent: e },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <button 
        class="${this.variant} ${this.size}"
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        ${this.label}
        <slot></slot>
      </button>
    `;
  }
}

globalThis.customElements.define(AppButton.tag, AppButton);