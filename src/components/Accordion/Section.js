/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import Component from '../../Component';
import SlideCollapse from '../../transitions/SlideCollapse';
import cssClass from '../../prop-types/cssClass';
import CONTEXT_TYPES from './ContextTypes';

export default class Section extends Component {
    static contextTypes = CONTEXT_TYPES;

    static defaultProps = {
        elementClassName: ['accordion', 'section']
    };

    static propTypes = {
        children: PropTypes.node,
        elementClassName: cssClass.isRequired,
        expanded: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired
    };

    /**
     * Render the accordion item section content and wrap with a collapsible slide transition.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props,
            index = props.index,
            expanded = props.expanded;

        return (
            <SlideCollapse expanded={expanded}>
                <section
                    role="tabpanel"
                    id={this.formatID('accordion-section', index)}
                    className={this.formatClass(props.elementClassName, {
                        'is-expanded': expanded
                    })}
                    aria-labelledby={this.formatID('accordion-header', index)}
                    aria-hidden={!expanded}
                    aria-expanded={expanded}>

                    {props.children}
                </section>
            </SlideCollapse>
        );
    }
}
