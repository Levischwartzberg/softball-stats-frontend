
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import AccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { ReactElement, ReactNode } from 'react';
import css from './GenericAccordion.module.scss';

export type GenericAccordionProps = {
    title: ReactElement | ReactNode;
    content: ReactElement | ReactNode;
    defaultExpanded?: boolean;
    expandIcon?: ReactNode;
    idBase?: string;
    accordionProps?: Omit<React.ComponentProps<typeof Accordion>, 'children'>;
    summaryProps?: AccordionSummaryProps;
    detailsProps?: AccordionDetailsProps;
};

const GenericAccordion: React.FC<GenericAccordionProps> = ({title, content, defaultExpanded = false, expandIcon = <ExpandMoreIcon />, idBase = 'generic-accordion', accordionProps, summaryProps, detailsProps,}) => {
    const headerId = `${idBase}-header`;
    const contentId = `${idBase}-content`;

    return (
        <Accordion defaultExpanded={defaultExpanded} {...accordionProps} className={css.genericAccordion}>
            <AccordionSummary
                expandIcon={expandIcon}
                aria-controls={contentId}
                id={headerId}
                {...summaryProps}
            >
                {title}
            </AccordionSummary>

            <AccordionDetails id={contentId} {...detailsProps}>
                {content}
            </AccordionDetails>
        </Accordion>
    );
};

export default GenericAccordion;
