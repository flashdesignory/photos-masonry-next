import { useState } from "react";

import ImageDisplay from "../image-display/image-display";
import styles from "./masonry-layout.module.css";

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

    return (
        <div className={styles["masonry-container"]}>
            <div className={styles["masonry-content"]}>
                {columns.map((column, index) => {
                    return (
                        <div key={`masonry-column-${index}`} className={styles["masonry-column"]}>
                         {column.map((item) => <ImageDisplay key={item.id} data={item} width={item.image.width} height={item.image.height} containerStyles={customStyles}/>)}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
