import React, { useState, useEffect } from "react";
import "./TransferList.css";

function TransferList() {
  const transferListDataLeft = [
    {
      id: "1",
      name: "India",
      checked: false,
      order: 0,
    },
    {
      id: "2",
      name: "China",
      checked: false,
      order: 1,
    },
    {
      id: "3",
      name: "USA",
      checked: false,
      order: 2,
    },
    {
      id: "4",
      name: "France",
      checked: false,
      order: 3,
    },
    {
      id: "5",
      name: "Italy",
      checked: false,
      order: 4,
    },
  ];
  const transferListDataRight = [];

  const [transferListLeft, setTransferListLeft] =
    useState(transferListDataLeft);
  const [transferListRight, setTransferListRight] = useState(
    transferListDataRight
  );
  const [isLeftChecked, setisLeftChecked] = useState(false);
  const [isRightChecked, setisRightChecked] = useState(false);

  useEffect(() => {
    console.log(transferListLeft, "transferListRight effect");
    const hasActiveLeft = transferListLeft.some((obj) => obj.checked);
    setisLeftChecked(hasActiveLeft);
  }, [transferListLeft]);

  useEffect(() => {
    console.log(transferListRight, "transferListRight effect");
    const hasActiveRight = transferListRight.some((obj) => obj.checked);
    setisRightChecked(hasActiveRight);
  }, [transferListRight]);

  function handleChange(e, from, index) {
    if (from === "left") {
      setTransferListLeft((prev) => {
        return prev.map((item, i) =>
          i === index ? { ...item, checked: e.target.checked } : item
        );
      });
    } else {
      setTransferListRight((prev) => {
        return prev.map((item, i) =>
          i === index ? { ...item, checked: e.target.checked } : item
        );
      });
    }
  }

  function sortByOrder(list) {
    return [...list].sort((a, b) => a.order - b.order);
  }

  function handleTransfer(type) {
    if (type === "rightAll") {
      console.log(transferListLeft, "transferListLeft");
      setTransferListRight((prev) => {
        return sortByOrder([...prev, ...transferListLeft]);
      });
      setTransferListLeft([]);
    } else if (type === "leftAll") {
      setTransferListLeft((prev) => {
        return sortByOrder([...prev, ...transferListRight]);
      });
      setTransferListRight([]);
    } else if (type === "right") {
      const toMove = transferListLeft.filter((item) => item.checked);
      const remaining = transferListLeft.filter((item) => !item.checked);

      setTransferListRight((prev) => {
        const updated = [
          ...prev,
          ...toMove.map((i) => ({ ...i, checked: false })),
        ];
        return sortByOrder(updated);
      });
      setTransferListLeft(remaining);
    } else {
      const toMove = transferListRight.filter((item) => item.checked);
      const remaining = transferListRight.filter((item) => !item.checked);
      setTransferListLeft((prev) => {
        return sortByOrder([
          ...prev,
          ...toMove.map((i) => ({ ...i, checked: false })),
        ]);
      });
      setTransferListRight(remaining);
    }
  }

  return (
    <div className="transferListContainer">
      <div className="transferLeftContainer">
        {transferListLeft.map((item, index) => {
          return (
            <div className="checkboxContainer" key={"key-left" + item.id}>
              <input
                id={"check-left" + index}
                type="checkbox"
                onChange={(e) => handleChange(e, "left", index)}
                name={"check-left" + index}
                checked={item.checked}
              />
              <label htmlFor={"check-left" + index}>{item.name}</label>
            </div>
          );
        })}
      </div>
      <div className="transferControls">
        <button
          onClick={() => handleTransfer("rightAll")}
          disabled={transferListLeft.length === 0}
        >
          {">>"}
        </button>
        <button
          onClick={() => handleTransfer("right")}
          disabled={!isLeftChecked}
        >
          {">"}
        </button>
        <button
          onClick={() => handleTransfer("leftAll")}
          disabled={transferListRight.length === 0}
        >
          {"<<"}
        </button>
        <button
          onClick={() => handleTransfer("left")}
          disabled={!isRightChecked}
        >
          {"<"}
        </button>
      </div>
      <div className="transferRightContainer">
        {transferListRight.map((item, index) => {
          return (
            <div className="checkboxContainer" key={"key-left" + item.id}>
              <input
                id={"check-left" + index}
                type="checkbox"
                onChange={(e) => handleChange(e, "right", index)}
                name={"check-left" + index}
                checked={item.checked}
              />
              <label htmlFor={"check-left" + index}>{item.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TransferList;
