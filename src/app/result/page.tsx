'use client'

import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import IngredientCard from "@/components/ingredient-card";
import StepCard from "@/components/step-card";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function Index() {
    const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "User will tell you a dish name and you need to return the recipe with the JSON schema: \n{\n\t\"name\": \"\",\n    \"ingredients\": [\n      {\n        \"part\": \"\",\n        \"ingredients\": []\n      }\n    ],\n    \"steps\": [\n      {\n        \"title\": \"\",\n        \"instructions\": []\n      }\n    ],\n    \"tips\": []\n}",
    });
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    };
    const [response, setResponse] = useState<GeminiResponse | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const prompt = urlParams.get('prompt');
        if (!apiKey) {
            console.error("API Key is not provided");
        }
        if (prompt && apiKey) {
            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [
                            {text: "blueberry cheese cake"},
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {text: "\n{\n  \"name\": \"Blueberry Cheesecake\",\n  \"ingredients\": [\n    {\n      \"part\": \"Crust\",\n      \"ingredients\": [\n        \"1 1/2 cups graham cracker crumbs\",\n        \"1/4 cup granulated sugar\",\n        \"6 tablespoons (3 ounces) unsalted butter, melted\"\n      ]\n    },\n    {\n      \"part\": \"Filling\",\n      \"ingredients\": [\n        \"3 (8 ounce) packages cream cheese, softened\",\n        \"1 1/2 cups granulated sugar\",\n        \"1/2 cup sour cream\",\n        \"2 large eggs\",\n        \"1 teaspoon vanilla extract\",\n        \"1/4 teaspoon salt\"\n      ]\n    },\n    {\n      \"part\": \"Blueberry Topping\",\n      \"ingredients\": [\n        \"1 (12 ounce) package frozen blueberries, thawed\",\n        \"1/4 cup granulated sugar\",\n        \"2 tablespoons lemon juice\",\n        \"1 tablespoon cornstarch\"\n      ]\n    }\n  ],\n  \"steps\": [\n    {\n      \"title\": \"Make the Crust\",\n      \"instructions\": [\n        \"Preheat oven to 350 degrees F (175 degrees C).\",\n        \"Combine graham cracker crumbs, sugar, and melted butter in a medium bowl. Press into the bottom of a 9-inch springform pan.\",\n        \"Bake in the preheated oven for 8 minutes. Let cool completely.\"\n      ]\n    },\n    {\n      \"title\": \"Make the Filling\",\n      \"instructions\": [\n        \"In a large bowl, beat cream cheese and sugar until smooth. Beat in sour cream, eggs, vanilla, and salt until combined.\",\n        \"Pour filling over the cooled crust.\"\n      ]\n    },\n    {\n      \"title\": \"Make the Blueberry Topping\",\n      \"instructions\": [\n        \"In a medium saucepan, combine blueberries, sugar, lemon juice, and cornstarch.\",\n        \"Bring to a boil over medium heat, stirring constantly. Reduce heat to low and simmer for 5 minutes, or until thickened.\",\n        \"Pour blueberry topping over the cheesecake filling.\"\n      ]\n    },\n    {\n      \"title\": \"Bake and Cool\",\n      \"instructions\": [\n        \"Bake in the preheated oven for 50-60 minutes, or until the center is just set. Let cool completely on a wire rack before serving.\"\n      ]\n    }\n  ],\n  \"tips\": [\n    \"For a more intense blueberry flavor, use fresh blueberries instead of frozen.\",\n    \"To prevent the cheesecake from cracking, wrap the bottom of the springform pan with foil before baking.\",\n    \"If you don't have a springform pan, you can bake the cheesecake in a regular 9-inch pie pan. Just be sure to trim the crust before baking.\"\n  ]\n}\n"},
                        ],
                    },
                ],
            });

            chatSession.sendMessage(prompt).then((response) => {
                setResponse(JSON.parse(response.response.text()));
            });
        }
    }, []);

    return (
    <div className="min-h-screen flex flex-col items-center">
        <div className="max-w-4xl w-full py-12 flex flex-col gap-5">
            <div className="text-center font-bold text-3xl italic">
                {
                    response ? response.name : <Skeleton className="h-12 w-[300px] inline-block"/>
                }
            </div>
            <div className="flex flex-col gap-0.5">
                {
                    response ? (
                        <>
                            <div className="text-gray-500 font-medium">Ingredients</div>
                            <ScrollArea className="w-full">
                                <div className="flex gap-2">
                                    {
                                        response.ingredients.map((ingredient, index) => (
                                            <IngredientCard key={index} title={ingredient.part} contents={ingredient.ingredients}/>
                                        ))
                                    }
                                </div>
                                <ScrollBar orientation="horizontal"/>
                            </ScrollArea>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="gap-2">
                                <Skeleton className="h-4 w-[100px]"/>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                                <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                                <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col gap-0.5">
                {
                    response ? (
                        <>
                            <div className="text-gray-500 font-medium">Steps</div>
                            <div className="flex flex-col gap-2">
                                {
                                    response.steps.map((step, index) => (
                                        <StepCard key={index} title={step.title} contents={step.instructions}/>
                                    ))
                                }
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="gap-2">
                                <Skeleton className="h-4 w-[100px]"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-[125px] w-full rounded-xl"/>
                                <Skeleton className="h-[125px] w-full rounded-xl"/>
                                <Skeleton className="h-[125px] w-full rounded-xl"/>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col gap-0.5">
                {
                    response ? (
                        <>
                            <div className="text-gray-500 font-medium">Tips</div>
                            <div className="flex flex-col gap-2 px-5">
                                <ul className="list-disc list-inside text-gray-500">
                                    {
                                        response.tips.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="gap-2">
                                <Skeleton className="h-4 w-[100px]"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-full rounded-xl"/>
                                <Skeleton className="h-4 w-full rounded-xl"/>
                                <Skeleton className="h-4 w-full rounded-xl"/>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
    );
}

type GeminiResponse = {
    "name": string,
    "ingredients": IngredientPart[],
    "steps": StepPart[],
    "tips": string[]
}

type IngredientPart = {
    "part": string,
    "ingredients": string[]
}

type StepPart = {
    "title": string,
    "instructions": string[]
}
