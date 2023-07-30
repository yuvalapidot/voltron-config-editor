var config = {};

config.NumOfSP = 4;

config.SPClasses = [
    'reinvestigation.ReinvestigationStepProducer',
    'investigation_input.InvestigationInputStepProducer',
    'wait_on_state.WaitTimeoutProducer',
    'top_investigation.StopInvestigationProducer',
    'evidence_insertion.EventsBatchInsertionProducer',
    'knowledge_base.KnowledgeBaseProducer',
    'tis_enrichment.TISStepProducer',
    'car_enrichment.CarEnrichmentProducer',
    'edge_scoring.DynamicEdgeScoringProducer',
    'score_propagation.BeliefPropagationProducer',
    'wait_on_state.WaitReadyForAnalysisProducer',
    'classification.ClassificationProducer',
    'investigation_scoring.InvestigationScoringProducer',
    'response_suggestion.ResponseSuggestionProducer',
    'graph_info.GraphInformationProducer',
    'write_investigation_results.ExportInvestigationResultsProducer',
    'write_investigation_results.ExportStatePickleProducer',
    'write_investigation_results.ExportGraphGexfProducer',
    'write_investigation_results.ExportEngineStatistics',
    'stop_investigation.StopInvestigationProducer',
    'udi_expansion.UDIExpansionStepProducer',
    'wait_on_state.WaitForEventsProducer',
]

module.exports = config;


