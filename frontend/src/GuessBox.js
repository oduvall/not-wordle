import React from "react";
import { Box } from "./Styles";


class GuessBox extends React.Component {
    render() {
        return (
            <Box backgroundColor={this.props.backgroundColor}>
                {this.props.currentLetter}
            </Box>
        );
    };
};


export default GuessBox;