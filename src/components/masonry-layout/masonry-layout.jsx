import { useState } from "react";
import ImageDisplay from "../image-display/image-display";
import styles from "./masonry-layout.module.css";

import { useResizeObserver } from "@/hooks/use-resize-observer/use-resize-observer";
import { useThrottle } from "@/hooks/use-throttle/use-throttle";

export const getNewHeight = (width, height, targetWidth) =>
  (height / width) * targetWidth;

export default function MasonryLayout({
    data = { items: [] },
    numColumns = 3,
}) {

    function rebuild() {
        const columns = [];
        // create an array for each column
        for (let i = 0; i < numColumns; i++) {
          columns[i] = [];
        }
    
        // push element data in the appropriate column
        for (let i = 0; i < data.items.length; i++) {
          const index = i % numColumns;
          columns[index].push(data.items[i]);
        }

        return columns
    }

    const [columns] = useState(rebuild());

    const customStyles = {
        width: "100%",
        height: "auto"
    }

    const [sizes, setSizes] = useState(
        data.items.map(() => ({
            width: 0,
            height: 0,
        }))
    );
    const [containerWidth, setContainerWidth] = useState(-1);
    const { elementRef, disconnect } = useResizeObserver({
        callback: useThrottle(handleOnResize, 0),
    });

    function handleOnResize(entries) {
        for (let entry of entries) {
            if (containerWidth === entry.contentRect.width) {
                return;
            }

            disconnect();
            setContainerWidth(entry.contentRect.width);
            resize(entry.contentRect.width);
        }
    }

    function resize(containerWidth) {
        const newWidth = containerWidth / numColumns;
        const newSizes = data.items.map((entry) => {
            const item = { ...entry.image };
            item.height = getNewHeight(item.width, item.height, newWidth);
            item.width = newWidth;
            return item;
        });
        
        setSizes(newSizes);
    }

    return (
        <div className={styles["masonry-container"]}ref={elementRef}>
            <div className={styles["masonry-content"]}>
                {columns.map((column, index) => {
                    return (
                        <div key={`masonry-column-${index}`} className={styles["masonry-column"]}>
                         {column.map((item) => <ImageDisplay key={item.id} data={item} width={sizes[index].width} height={sizes[index].height} containerStyles={customStyles}/>)}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
