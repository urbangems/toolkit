/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import Component from '../../Component';
import bind from '../../decorators/bind';
import cssClass from '../../prop-types/cssClass';
import CONTEXT_TYPES from './ContextTypes';

export default class Item extends Component {
    static contextTypes = CONTEXT_TYPES;

    static defaultProps = {
        elementClassName: ['pagination', 'item']
    };

    static propTypes = {
        children: PropTypes.node,
        elementClassName: cssClass.isRequired,
        page: PropTypes.number.isRequired
    };

    /**
     * Handler the jumps to another page.
     *
     * @param {SyntheticEvent} e
     */
    @bind
    handleOnClick(e) {
        e.preventDefault();

        this.context.goToPage(this.props.page);
    }

    /**
     * Render the pagination item link.
     *
     * @returns {ReactElement}
     */
    render() {
        let { page, ...props } = this.props,
            context = this.context,
            // TODO Change?
            key = this._reactInternalInstance._currentElement.key;

        return (
            <li>
                <a href={context.url.replace('{{page}}', page)}
                    className={this.formatClass(props.elementClassName, {
                        'is-active': (key.match(/\d/) && context.currentPage === page),
                        'is-first': (key === 'first'),
                        'is-last': (key === 'last'),
                        'is-next': (key === 'next'),
                        'is-prev': (key === 'prev')
                    })}
                    onClick={this.handleOnClick}>

                    {props.children || page}
                </a>
            </li>
        );
    }
}
