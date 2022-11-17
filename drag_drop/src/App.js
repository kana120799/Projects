import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import user from "./Data/user";
import React from "react";
import { useEffect, useState } from "react";
import styled from "./CSS/index.module.css";

function App() {
  /// ///////////////////////////////////////////                      Styling  during dragging process                      //////////////////////////////////////////////////////////

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",

    background: isDragging ? "#212529" : "",
    ...draggableStyle,
  });
  const [items, setItems] = useState(user.data);

  /// /////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    var tt = document.getElementsByClassName("colosymbol");
    user.colorData.forEach((ele, ind) => {
      tt[ind].style.backgroundColor = ele;
    });
  });

  /// ///////////////////////////////////////////                     onDragEnd Event handler function                        //////////////////////////////////////////////////////////
  const handleDragEnd = (results) => {
    // if user try to put drag element outside of DragDropContext
    if (!results.destination) return;
    //  source and destination
    console.log(results);
    let tempUser = [...items];
    let [selectedRow] = tempUser.splice(results.source.index, 1);
    tempUser.splice(results.destination.index, 0, selectedRow);
    console.log(tempUser);
    setItems(tempUser);
  };

  return (
    <>
      <div style={{ margin: "40px" }}>
        <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
          <table className="table table-borderless table-dark container-fluid">
            <thead>
              <tr style={{ color: "#626466" }}>
                <th></th>
                <th scope="col">Company Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Payment Date</th>
              </tr>
            </thead>
            <Droppable droppableId="droppable">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item, index) => {
                    return (
                      //must use "-" for draggableId, without it's not work
                      <Draggable
                        draggableId={"-" + index}
                        index={index}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <tr
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <td></td>
                            {/* /// ///////////////////////////////////////////                      Company Name                      ////////////////////////////////////////////////////////// */}

                            <td>
                              <div style={{ display: "flex" }}>
                                <div
                                  className={`colosymbol ${styled.symbolcolor}`}
                                >
                                  <div>{item.logo}</div>
                                </div>
                                <div>{item.companyName}</div>
                              </div>
                            </td>
                            {/* /// ///////////////////////////////////////////                     Username                      ////////////////////////////////////////////////////////// */}

                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ marginRight: "5px" }}>
                                  <i className={`${item.iconClass}`}></i>
                                </div>
                                <div>{item.userName}</div>
                              </div>
                            </td>
                            {/* /// ///////////////////////////////////////////                    Payment Status                      ////////////////////////////////////////////////////////// */}

                            <td>{item.contact}</td>
                            {item.paymentStatus.payment ? (
                              <td>
                                <button
                                  style={{ textTransform: "uppercase" }}
                                  type="button"
                                  className={`btn btn-outline-${item.paymentStatus.btncolor} btn-light`}
                                >
                                  {item.paymentStatus.status}
                                </button>
                              </td>
                            ) : (
                              <td></td>
                            )}
                            {/* /// ///////////////////////////////////////////                     Payment Date                      ////////////////////////////////////////////////////////// */}

                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ marginRight: "5px" }}>
                                  {item.paymentStatus.status === "pending" ? (
                                    <div className={styled.btn1}></div>
                                  ) : item.paymentStatus.status === "done" ||
                                    item.paymentStatus.status === "failed" ? (
                                    <div className={styled.btn2}></div>
                                  ) : (
                                    <div className={styled.btn3}></div>
                                  )}
                                </div>
                                <div>{item.date}</div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
