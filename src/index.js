import { createElement, Component, render } from './simple-react';


class Mycomponent extends Component {
    render() {
        return <div>
            <h1>component</h1>
            {this.children}
        </div>
    }
}
// const App = 




render(<Mycomponent class='aaa' id='bbb'>
<div>233</div>
<div>让他有人要</div>
</Mycomponent>, document.getElementById('app'))

