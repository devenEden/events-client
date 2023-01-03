import React from "react";
import PropTypes, { any } from "prop-types";
import { Result, Layout, Button } from "antd";

const { Content } = Layout;
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <Content fluid className="bg-light min-vh-100 d-flex">
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button onClick={() => window.location.reload()} type="primary">
                LET&apos;S TRY AGAIN
              </Button>
            }
          />
        </Content>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([any]).isRequired,
};

export default ErrorBoundary;
