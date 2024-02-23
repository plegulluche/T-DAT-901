from fastapi import BackgroundTasks, HTTPException , APIRouter
from pydantic import BaseModel
from typing import List
from ...services.kafka_consumer import KafkaConsumerService

router = APIRouter()

class Topics(BaseModel):
    topics: List[str]

@router.post("/start-consumer/v2")
async def start_consumer(topics: Topics, background_tasks: BackgroundTasks):
    try:
        # Assuming KafkaConsumerService is properly defined and integrated
        consumer_service = KafkaConsumerService(topics.topics)
        background_tasks.add_task(consumer_service.start_consuming)
        return {"message": "Consumer started", "topics": topics.topics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))