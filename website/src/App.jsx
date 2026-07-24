import React, { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import BasicExample from "./components/BasicExample";
import UncontrolledExample from "./components/UncontrolledExample";
import DisabledExample from "./components/DisabledExample";
import AllFeaturesExample from "./components/AllFeaturesExample";
import CustomIconsExample from "./components/CustomIconsExample";
import HideCheckboxesExample from "./components/HideCheckboxesExample";
import CrudExample from "./components/CrudExample";
import NodeClickExample from "./components/NodeClickExample";
import StylingExample from "./components/StylingExample";
import SearchExample from "./components/SearchExample";
import LazyLoadExample from "./components/LazyLoadExample";
import LargeDataExample from "./components/LargeDataExample";
import ExpandAllCollapseAllExample from "./components/ExpandAllCollapseAllExample";

const navItems = [
  { href: "#basic", label: "Basic" },
  { href: "#uncontrolled", label: "Uncontrolled" },
  { href: "#disabled", label: "Disabled" },
  { href: "#all-features", label: "All Features" },
  { href: "#custom-icons", label: "Icons" },
  { href: "#hide-checkboxes", label: "No checkboxes" },
  { href: "#crud", label: "CRUD" },
  { href: "#node-click", label: "Click path" },
  { href: "#styling", label: "Styling" },
  { href: "#search", label: "Search" },
  { href: "#lazy", label: "Lazy load" },
  { href: "#large-data", label: "Large data" },
  { href: "#expand-all-collapse-all", label: "Expand all / Collapse all" },
];

const examples = [
  BasicExample,
  UncontrolledExample,
  DisabledExample,
  AllFeaturesExample,
  CustomIconsExample,
  HideCheckboxesExample,
  CrudExample,
  NodeClickExample,
  StylingExample,
  SearchExample,
  LazyLoadExample,
  LargeDataExample,
  ExpandAllCollapseAllExample,
];

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("isReady");
  }, []);

  return (
    <div className="page">
      <div className="pageGlow" aria-hidden="true" />

      <header className="topBar">
        <a className="brandMark" href="#top">
          react-tree-checkbox
        </a>
        <nav className="topNav" aria-label="Examples">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroCopy">
            <p className="heroBrand">react-tree-checkbox</p>
            <h1>Accessible React checkbox trees</h1>
            <p className="heroLead">
              Cascading checks, keyboard navigation, custom icons, and CRUD helpers —
              built for production apps.
            </p>
            <div className="heroActions">
              <a
                className="btnPrimary"
                href="https://github.com/arslanahmed777/react-tree-checkbox"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
              <a
                className="btnGhost"
                href="https://www.npmjs.com/package/react-tree-checkbox"
                target="_blank"
                rel="noreferrer"
              >
                npm i react-tree-checkbox
              </a>
            </div>
          </div>
          <div className="heroVisual" aria-hidden="true">
            <div className="heroTreeSketch">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <section className="installBand">
          <h2>Install</h2>
          <pre>
            <code>npm i react-tree-checkbox</code>
          </pre>
        </section>

        {examples.map((Example, index) => (
          <ErrorBoundary key={Example.name || index}>
            <Example />
          </ErrorBoundary>
        ))}
      </main>

      <footer className="siteFooter">
        <p>
          Maintained by{" "}
          <a
            href="https://github.com/arslanahmed777"
            target="_blank"
            rel="noreferrer"
          >
            Arslan Ahmed Shaad
          </a>
          . Hosted on GitHub Pages.
        </p>
      </footer>
    </div>
  );
}
