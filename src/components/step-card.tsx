import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const StepCard = ({title, contents}: {
    title: string,
    contents: string[]
}) => {
    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <CardTitle className="italic">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside text-gray-500">
                    {
                        contents.map((content, index) => (
                            <li key={index}>{content}</li>
                        ))
                    }
                </ol>
            </CardContent>
        </Card>
    )
}

export default StepCard;