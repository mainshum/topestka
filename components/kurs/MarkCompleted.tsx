import { Button } from "../Button";

export function MarkCompleted({markAsCompleted, currentSubchapterId}: {markAsCompleted: (id: string) => void, currentSubchapterId: string}) {
    return (
      <Button
        className="px-6 border border-eblue-600 rounded-md"
        variant="ghost"
        size="sm"
        onClick={() => markAsCompleted(currentSubchapterId)}
      >
        Oznacz lekcję jako ukończoną
      </Button>
    )
}