/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

export const RenderTree = ({ handleClickTreeItem }) => {
  const id = 10;

  const testArr = [1, 2, 3, 4];
  return (
    <>
      {testArr.map((item) => (
        <button key={item} onClick={() => handleClickTreeItem(item)}>
          x
        </button>
      ))}
    </>
  );
};

export default function Asd() {
  const handleClickTreeItem = (id) => {
    // execute: callAPI by this.id => get rawData
    /** 
       const fetchAPI = async () => {
            const res = await fetch(`https://awing.com.vn/api/${id}`)
            const data = await res.json()
       }
       return fetchAPI()
      */
    // execute: convertData => get convertedData
    // execute: setConvertedData(new convertedData)
  };

  return <RenderTree handleClickTreeItem={handleClickTreeItem} />;
}
