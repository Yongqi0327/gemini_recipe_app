'use client'

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [prompt, setPrompt] = useState<string>("");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full">
            <div className="flex flex-col justify-center items-center flex-1 gap-6">
                <div className="flex flex-col items-center gap-1">
                    <div className="font-black text-5xl">AI Recipe App</div>
                    <div className="flex items-center gap-1.5">
                        <div className="translate-y-1 text-gray-400">powered by</div>
                        <img src="/gemini.svg" className="h-6" alt="Google Gemini logo"/>
                    </div>
                </div>
                <div className="w-full">
                    <Textarea value={prompt} onChange={(elem) => {setPrompt(elem.target.value)}} className="resize-none h-52" placeholder="Write your prompt here..."/>
                </div>
                <div className="italic text-sm text-gray-300">
                    Use of the information provided is at your own risk.
                </div>
                <div>
                    <Button onClick={() => {router.push(`/result?prompt=${prompt}`)}}>Submit</Button>
                </div>
            </div>
        </div>
    </div>
  );
}
