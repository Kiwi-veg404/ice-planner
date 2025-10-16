/**
 * Copyright 2025 Junyu Zhao
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `number-input`
 * A reusable number input component with label and validation
 * 
 * @element number-input
 */
export class NumberInput extends DDDSuper(LitElement) {

  static get tag() {
    return "number-input";
  }

  constructor() {
    super();
    this.label = "";
    this.value = 0;
    this.min = 0;
    this.max = Infinity;
    this.step = 1;
    this.suffix = "";
    this.prefix = "";
  }

  static get properties() {
    return {
      ...super.properties,
      label: { type: String },
      value: { type: Number },
      min: { type: Number },
      max: { type: Number },
      step: { type: Number },
      suffix: { type: String },
      prefix: { type: String }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        margin: var(--ddd-spacing-2) 0;
      }
      .input-container {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
      }
      label {
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-primary);
        font-weight: bold;
      }
      .input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid var(--ddd-theme-default-limestoneLight);
        border-radius: var(--ddd-radius-sm);
        padding: var(--ddd-spacing-2);
        background-color: var(--ddd-theme-default-white);
        transition: border-color 0.3s ease;
      }
      .input-wrapper:focus-within {
        border-color: var(--ddd-theme-primary);
        box-shadow: 0 0 0 2px var(--ddd-theme-primary-light);
      }
      .prefix, .suffix {
        color: var(--ddd-theme-default-coalyGray);
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-s);
      }
      input {
        border: none;
        outline: none;
        flex: 1;
        padding: 0;
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-s);
        background: transparent;
        text-align: right;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
      }

      @media (prefers-color-scheme: dark) {
        .input-wrapper {
          background-color: var(--ddd-theme-default-coalyGray);
          border-color: var(--ddd-theme-default-limestoneGray);
          color: var(--ddd-theme-default-white);
        }
        input {
          color: var(--ddd-theme-default-white);
        }
        .prefix, .suffix {
          color: var(--ddd-theme-default-limestoneLight);
        }
      }
    `];
  }

  _handleInput(e) {
    let newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) newValue = this.min;
    if (newValue < this.min) newValue = this.min;
    if (newValue > this.max) newValue = this.max;
    
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="input-container">
        <label for="input">${this.label}</label>
        <div class="input-wrapper">
          ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}
          <input 
            id="input"
            type="number" 
            .value="${this.value.toString()}" 
            .min="${this.min}"
            .max="${this.max}"
            .step="${this.step}"
            @input="${this._handleInput}"
          />
          ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(NumberInput.tag, NumberInput);