import { useState, useEffect } from "react";
import { Page } from "../component/Page";
import { Header } from "../component/Header";
import { ApiService } from "../service/ApiService";

export function DevDashboard() {
    const [devInfo, setDevInfo] = useState();
    const { hasData, tables, shoppingListItems } = parseDevInfo(devInfo);

    useEffect(() => {
        ApiService.getDevInfo().then(resp => {
            setDevInfo(resp.data);
        });
    }, []);

    return (
        <>
            <Header />

            <Page>
                <div id="dev-dashboard">
                    {!hasData && <p>There are no tables</p>}

                    {hasData && (
                        <>
                            <p>
                                <b>TABLE NAMES:</b>
                                {tables.map(name => <span>{name}</span>)}
                            </p>

                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                </tr>

                                {shoppingListItems.map(item => {
                                    return (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.qty}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </>
                    )}
                </div>
            </Page>
        </>
    );
}

function parseDevInfo(devInfo) {
    const hasData = devInfo?.tables?.length > 0;
    let tables = [];
    let shoppingListItems = [];

    if (hasData) {
        tables = devInfo.tables.map(t => t.table_name);
    }

    if (devInfo?.data?.shoppingListItems) {
        shoppingListItems = devInfo?.data?.shoppingListItems;
    }

    return { hasData, tables, shoppingListItems };
}





