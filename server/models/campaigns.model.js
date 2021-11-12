import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    atendants: Array,
    start: { type: Date, default: Date.now()},
    end: Date     
});

const campaignSchema = mongoose.Schema({
    campaignName: String,
    players: Array,
    characters: Array,
    code: String,
    gamemaster: String,
    sessions: [sessionSchema]
});

const CampaingModel = mongoose.model('CampaingModel', campaignSchema);

export default CampaingModel;