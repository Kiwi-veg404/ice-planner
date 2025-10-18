/**
 * Copyright 2025 Junyu Zhao
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./number-input.js";
import "./app-button.js";

/**
 * `ice-planner`
 * Ice hockey team cost calculator with customizable parameters
 * 
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-planner";
  }

  constructor() {
    super();
    // Team customization
    this.teamName = "Team Hawks";
    this.logo = "";
    
    // Default values as specified in requirements
    this.iceCostPerHour = 300;
    this.numberOfSlots = 50;
    this.overheadPercentage = 2;
    this.coachesCost = 3000;
    this.jerseysCost = 88;
    this.numberOfPlayers = 1;
    
    // Calculated values
    this.totalCost = 0;
    this.costPerPlayer = 0;
    
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Ice Hockey Team Cost Calculator",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ice-planner.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
    
    // Calculate initial costs
    this.calculateCosts();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      logo: { type: String },
      iceCostPerHour: { type: Number },
      numberOfSlots: { type: Number },
      overheadPercentage: { type: Number },
      coachesCost: { type: Number },
      jerseysCost: { type: Number },
      numberOfPlayers: { type: Number },
      totalCost: { type: Number },
      costPerPlayer: { type: Number },
    };
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('numberOfPlayers') || changedProperties.has('iceCostPerHour') || changedProperties.has('numberOfSlots') || changedProperties.has('overheadPercentage') || changedProperties.has('coachesCost') || changedProperties.has('jerseysCost')) {
      if (this.numberOfPlayers <= 1) {
        this.numberOfPlayers = 1;
      }
      if (this.numberOfSlots <= 1) {
        this.numberOfSlots = 1;
      }
      
      this.calculateCosts()
    }
  }

  // methods to modify count
  reset() {
    this.iceCostPerHour = 300;
    this.numberOfSlots = 50;
    this.overheadPercentage = 2;
    this.coachesCost = 3000;
    this.jerseysCost = 88;
    this.numberOfPlayers = 1;
    this.calculateCosts();
  }
  addOneToSlots() {
    this.numberOfSlots++;
    this.calculateCosts();
  }
  minusOneFromSlots() {
    if (this.numberOfSlots > 1) {
      this.numberOfSlots--;
      this.calculateCosts();
    }
  }
  addOneToPlayers() {
    this.numberOfPlayers++;
    this.calculateCosts();
  }
  minusOneFromPlayers() {
    if (this.numberOfPlayers > 1) {
      this.numberOfPlayers--;
      this.calculateCosts();
    }
  }

  // Calculate total costs
  calculateCosts() {
    const iceTotal = this.iceCostPerHour * this.numberOfSlots;
    const overheadCost = iceTotal * (this.overheadPercentage / 100);
    const jerseyTotal = this.jerseysCost * this.numberOfPlayers;
    
    this.totalCost = iceTotal + overheadCost + this.coachesCost + jerseyTotal;
    this.costPerPlayer = this.numberOfPlayers > 0 ? this.totalCost / this.numberOfPlayers : 0;
  }

  // Handle input changes
  _handleValueChange(e) {
    const property = e.target.getAttribute('data-property');
    if (property) {
      this[property] = e.detail.value;
      this.calculateCosts();
    }
  }

  _handleTeamNameChange(e) {
    this.teamName = e.target.value;
  }

  _handleLogoChange(e) {
    this.logo = e.target.value;
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-white);
        font-family: var(--ddd-font-navigation);
        min-height: 100vh;
      }
      
      .wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--ddd-spacing-4);
      }
      
      .header {
        text-align: center;
        margin-bottom: var(--ddd-spacing-6);
        padding: var(--ddd-spacing-4);
        background: linear-gradient(135deg, var(--ddd-theme-primary), var(--ddd-theme-accent));
        color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-md);
      }
      
      .header h1 {
        margin: 0 0 var(--ddd-spacing-2) 0;
        font-size: var(--ddd-font-size-xl);
        font-weight: bold;
      }
      
      .team-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--ddd-spacing-3);
        margin-top: var(--ddd-spacing-2);
      }
      
      .logo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--ddd-theme-default-white);
      }
      
      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--ddd-spacing-6);
      }
      
      .form-section, .results-section {
        background-color: var(--ddd-theme-default-white);
        padding: var(--ddd-spacing-5);
        border-radius: var(--ddd-radius-md);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--ddd-theme-default-limestoneLight);
      }
      
      .section-title {
        font-size: var(--ddd-font-size-l);
        font-weight: bold;
        margin: 0 0 var(--ddd-spacing-4) 0;
        color: var(--ddd-theme-primary);
        border-bottom: 2px solid var(--ddd-theme-primary);
        padding-bottom: var(--ddd-spacing-2);
      }
      
      .input-group {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-3);
      }
      
      .team-customization {
        margin-bottom: var(--ddd-spacing-4);
        padding-bottom: var(--ddd-spacing-4);
        border-bottom: 1px solid var(--ddd-theme-default-limestoneLight);
      }
      
      .basic-input {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
        margin-bottom: var(--ddd-spacing-3);
      }
      
      .basic-input label {
        font-weight: bold;
        color: var(--ddd-theme-primary);
        font-size: var(--ddd-font-size-s);
      }
      
      .basic-input input {
        padding: var(--ddd-spacing-2);
        border: 1px solid var(--ddd-theme-default-limestoneLight);
        border-radius: var(--ddd-radius-sm);
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-s);
      }
      
      .results-section {
        background: linear-gradient(135deg, var(--ddd-theme-accent), var(--ddd-theme-default-white));
      }
      
      .cost-display {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-3);
      }
      
      .cost-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ddd-spacing-3);
        background-color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-sm);
        border-left: 4px solid var(--ddd-theme-primary);
      }
      
      .cost-item.total {
        background: linear-gradient(135deg, var(--ddd-theme-primary), var(--ddd-theme-primary-dark));
        background-color: var(--ddd-theme-default-accent);
        font-size: var(--ddd-font-size-m);
        font-weight: bold;
        border-left-color: var(--ddd-theme-primary-dark);
      }
      
      .cost-label {
        font-weight: bold;
        color: var(--ddd-theme-primary);
      }
      
      .cost-item.total .cost-label {
        color: var(--ddd-theme-primary);
      }
      
      .cost-value {
        font-weight: bold;
        font-size: var(--ddd-font-size-m);
        color: var(--ddd-theme-primary-dark);
      }
      
      .cost-item.total .cost-value {
        color: var(--ddd-theme-primary);
      }

      #smaller-text {
        font-size: var(--ddd-font-size-xs);
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .content {
          grid-template-columns: 1fr;
          gap: var(--ddd-spacing-4);
        }
        
        .wrapper {
          padding: var(--ddd-spacing-2);
        }
        
        .header h1 {
          font-size: var(--ddd-font-size-l);
        }
        
        .team-info {
          flex-direction: column;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        :host {
          background-color: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
        }
        
        .form-section, .results-section {
          background-color: var(--ddd-theme-default-limestoneGray);
          border-color: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
        }
        
        .results-section {
          background: linear-gradient(135deg, var(--ddd-theme-default-limestoneGray), var(--ddd-theme-default-coalyGray));
        }
        
        .cost-item {
          background-color: var(--ddd-theme-default-coalyGray);
        }

        .cost-label {
          color: var(--ddd-theme-default-white);
        }
        
        .cost-value {
          color: var(--ddd-theme-default-limestoneLight);
        }
        
        .basic-input input {
          background-color: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
          border-color: var(--ddd-theme-default-limestoneGray);
        }
        
        .basic-input label {
          color: var(--ddd-theme-default-white);
        }
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          <h1>${this.t.title}</h1>
          <div class="team-info">
            ${this.logo ? html`<img class="logo" src="${this.logo}" alt="${this.teamName} logo" />` : ''}
            <h2>${this.teamName}</h2>
          </div>
        </div>
        
        <div class="content">
          <div class="form-section">
            <h3 class="section-title">Team Configuration</h3>
            
            <div class="team-customization">
              <div class="basic-input">
                <label for="teamName">Team Name</label>
                <input 
                  id="teamName" 
                  type="text" 
                  .value="${this.teamName}" 
                  @input="${this._handleTeamNameChange}"
                />
              </div>
              
              <div class="basic-input">
                <label for="logo">Logo URL</label>
                <input 
                  id="logo" 
                  type="url" 
                  .value="${this.logo}" 
                  @input="${this._handleLogoChange}"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
            
            <div class="input-group">
              <number-input
                label="Ice Cost (per Hour)"
                .value="${this.iceCostPerHour}"
                prefix="$"
                data-property="iceCostPerHour"
                @value-changed="${this._handleValueChange}"
              ></number-input>
              
              <number-input
                label="Number of Ice Slots (Season)"
                .value="${this.numberOfSlots}"
                suffix="hours"
                data-property="numberOfSlots"
                @value-changed="${this._handleValueChange}"
              ></number-input>
              <div>
                <app-button @click="${this.minusOneFromSlots}">-1</app-button>
                <app-button @click="${this.addOneToSlots}">+1</app-button>
                (minimum is 1)
              </div>

              <number-input
                label="Coaches Cost (Total)"
                .value="${this.coachesCost}"
                prefix="$"
                data-property="coachesCost"
                @value-changed="${this._handleValueChange}"
              ></number-input>
              
              <number-input
                label="Jersey Cost (per Player)"
                .value="${this.jerseysCost}"
                prefix="$"
                data-property="jerseysCost"
                @value-changed="${this._handleValueChange}"
              ></number-input>
              
              <number-input
                label="Number of Players"
                .value="${this.numberOfPlayers}"
                data-property="numberOfPlayers"
                @value-changed="${this._handleValueChange}"
              ></number-input>
              <div>
                <app-button @click="${this.minusOneFromPlayers}">-1</app-button>
                <app-button @click="${this.addOneToPlayers}">+1</app-button>
                (minimum is 1)
              </div>

              <number-input
                label="Overhead Percentage"
                .value="${this.overheadPercentage}"
                suffix="%"
                data-property="overheadPercentage"
                @value-changed="${this._handleValueChange}"
              ></number-input>
            </div>
            <app-button @click="${this.reset}">Reset</app-button>
          </div>
          
          <div class="results-section">
            <h3 class="section-title">Cost Breakdown</h3>
            
            <div class="cost-display">
              <div class="cost-item">
                <span class="cost-label">Ice Time</span>
                <span class="cost-value">$${(this.iceCostPerHour * this.numberOfSlots).toLocaleString()}</span>
              </div>

              <div class="cost-item">
                <span class="cost-label">Coaches</span>
                <span class="cost-value">$${this.coachesCost.toLocaleString()}</span>
              </div>
              
              <div class="cost-item">
                <span class="cost-label">Jerseys (${this.numberOfPlayers} × $${this.jerseysCost})</span>
                <span class="cost-value">$${(this.jerseysCost * this.numberOfPlayers).toLocaleString()}</span>
              </div>

              <div class="cost-item">
                <span class="cost-label">Overhead (${this.overheadPercentage}%)</span>
                <span class="cost-value">$${((this.iceCostPerHour * this.numberOfSlots + this.coachesCost + this.jerseysCost * this.numberOfPlayers) * (this.overheadPercentage / 100)).toLocaleString()}</span>
              </div>
              
              <div class="cost-item total">
                <span class="cost-label">Total Season Cost</span>
                <span class="cost-value">$${this.totalCost.toLocaleString()}</span>
              </div>
              
              <div class="cost-item total">
                <span class="cost-label" id="smaller-text">Cost per Player (Total/number of players)</span>
                <span class="cost-value">$${Math.round(this.costPerPlayer).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);