import React from "react";
import { Card } from "./ui/card";

const DeleteModal: React.FC = () => {

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-scroll">
                <Card className="w-96 absolute z-20 ">
                    
                </Card>
            </div>
        </>
    )
}