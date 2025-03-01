/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import Component from '../../Component';
import cssClass from '../../prop-types/cssClass';
import CONTEXT_TYPES from './ContextTypes';

export default class Item extends Component {
    static contextTypes = CONTEXT_TYPES;

    static defaultProps = {
        elementClassName: ['carousel', 'item']
    };

    static propTypes = {
        children: PropTypes.node,
        className: cssClass,
        elementClassName: cssClass.isRequired,
        index: PropTypes.number.isRequired
    };

    /**
     * Render the individual list item.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props,
            index = props.index,
            active = this.context.isItemActive(index);

        return (
            <li role="tabpanel"
                id={this.formatID('carousel-item', index)}
                className={this.formatClass(props.elementClassName, props.className, {
                    'is-active': active
                })}
                aria-hidden={!active}
                {...this.inheritNativeProps(props)}>

                {props.children}
            </li>
        );
    }
}
