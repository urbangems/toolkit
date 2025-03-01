/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React from 'react';
import Component from '../../Component';
import Col from './Col';
import children from '../../prop-types/children';
import cssClass from '../../prop-types/cssClass';

export default class Row extends Component {
    static defaultProps = {
        elementClassName: 'row'
    };

    static propTypes = {
        children: children(Col),
        className: cssClass,
        elementClassName: cssClass.isRequired
    };

    /**
     * Render the grid row.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props;

        return (
            <div
                className={this.formatClass(props.elementClassName, props.className)}
                {...this.inheritNativeProps(props)}>

                {props.children}
            </div>
        );
    }
}
