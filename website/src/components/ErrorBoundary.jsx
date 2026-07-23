import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="exampleError">
          <strong>Example failed to render.</strong>
          <pre>{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
