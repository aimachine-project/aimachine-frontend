import React from "react";

class CanvasComponent extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(100,100, 600, 600);
    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

export default CanvasComponent;

// ReactDOM.render(<CanvasComponent/>, document.getElementById('container'));